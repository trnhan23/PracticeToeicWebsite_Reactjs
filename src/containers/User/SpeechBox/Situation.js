import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './Situation.scss';
import './ReactMic.scss';
import { ROLE } from '../../../utils';
import logo from "../../../assets/logo.png";
import { ReactMic } from "react-mic";
import axios from "axios";
import { getAllTopics } from '../../../services/topicService';
import {
    createSituationApi,
    createQuestionOrAnswerApi,
    createQuestionOrAnswerApi1,
    getSuggestedAnswer
} from '../../../services/geminiService';
import DetailModal from './DetailModal';

class Situation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            topic: [],
            translatedMessages: {},
            isTranslatedMessages: {},
            selectedMessage: null,
            isModalOpen: false,
            isModalOpen: true,
            showHint: false,
            hint: "Không có gợi ý",
            questionHint: null,
            isListening: false,
            blobURL: null,
            audioBlob: null,
            generatedSituations: null,
            sampleMessages: [],
            selectedQuestion: null,
        };
        this.translateText = this.translateText.bind(this);
    }

    async componentDidMount() {
        await this.getTopic();

        const sortedMessages = this.state.sampleMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        this.setState({ messages: sortedMessages });

        await this.createSituation();
        if (this.state.generatedSituations) {
            this.createQuestionOrAnswer();
        }

        if ("webkitSpeechRecognition" in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = "en-US";
            recognition.onresult = this.handleSpeechResult;
            this.setState({ recognition });
        } else {
            alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
        }
    };

    getTopic = async () => {
        try {
            const { match } = this.props;
            const { topicId } = match.params;
            let response = await getAllTopics(topicId);
            if (response && response.errCode === 0) {
                this.setState({ topic: response.topics });
            } else {
                console.error("Lỗi: response không chứa mảng topics hợp lệ", response);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    startListening = () => {
        if (this.state.recognition) {
            this.state.recognition.start();
            this.setState({ isListening: true });
        }
    };

    stopListening = () => {
        if (this.state.recognition) {
            this.state.recognition.stop();
            this.setState({ isListening: false });
        }
    };

    onStop = async (recordedBlob) => {
        this.setState({ blobURL: recordedBlob.blobURL, audioBlob: recordedBlob.blob });

        if (!recordedBlob.blob) {
            console.error("Không có file âm thanh");
            return;
        }

        const formData = new FormData();
        formData.append("file", recordedBlob.blob, "audio.wav");

        try {
            const response = await axios.post("http://localhost:5050/transcribe/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const transcribedText = response.data.text;
            console.log("Kết quả nhận diện:", transcribedText);
            this.createQuestionOrAnswer(transcribedText);

            const newMessage = {
                id: this.state.messages.length + 1,
                text: transcribedText,
                role: "R2",
                createdAt: new Date().toISOString(),
            };

            this.setState((prevState) => ({
                messages: [...prevState.messages, newMessage],
                isListening: false,
            }));

        } catch (error) {
            console.error("Lỗi khi gửi file lên API:", error);
        }
    };

    translateText = async (id, text) => {
        try {
            const isTranslated = !!this.state.translatedMessages[id];
            const sourceLang = isTranslated ? "vi" : "en";
            const targetLang = isTranslated ? "en" : "vi";

            const response = await axios.post("http://localhost:9090/api/gemini-translate", {
                prompt: text,
                sourceLang,
                targetLang
            }, {
                headers: { "Content-Type": "application/json" }
            });

            this.setState((prevState) => {
                const updatedTranslatedMessages = { ...prevState.translatedMessages };
                if (isTranslated) {
                    delete updatedTranslatedMessages[id];
                } else {
                    updatedTranslatedMessages[id] = response.data.text;
                }

                return { translatedMessages: updatedTranslatedMessages };
            });
        } catch (error) {
            console.error("Translation error:", error.response?.data || error.message);
        }
    };

    handleSelect = (id) => {
        const selectedMessage = this.state.messages.find(msg => msg.id === id);

        // Kiểm tra nếu tin nhắn là của AI thì lấy text của AI
        const question = selectedMessage.role === ROLE.AI
            ? selectedMessage.text
            : this.state.messages.find(msg => msg.role === ROLE.AI)?.text || selectedMessage.text;

        this.setState({ selectedMessage, selectedQuestion: question, isModalOpen: true });
    };

    toggleHint = () => {
        this.setState((prevState) => ({ showHint: !prevState.showHint }), async () => {
            if (this.state.showHint) {
                const situation = this.state.selectedSituation || this.state.generatedSituations;
                const question = this.state.questionHint;

                if (!situation || !question) {
                    console.error("Thiếu dữ liệu!");
                    return;
                }

                try {
                    let response = await getSuggestedAnswer(situation, question);
                    console.log("Gợi ý câu trả lời:", response);
                    this.setState({
                        hint: response || "Không có gợi ý"
                    })
                } catch (error) {
                    console.error("Lỗi gọi API:", error);
                }
            }
        });
    };



    closeModal = () => {
        this.setState({ isModalOpen: false, selectedMessage: null });

    };

    playTextToSpeech = async (text) => {
        try {
            const response = await axios.post(
                "http://localhost:5050/text-to-speech/",
                { text },
                { responseType: "blob" }
            );

            const audioBlob = new Blob([response.data], { type: "audio/wav" });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error("Lỗi khi gọi API chuyển văn bản thành giọng nói:", error);
        }
    };

    createSituation = async () => {
        try {
            const { topic } = this.state;
            if (!topic || topic.length === 0) {
                console.error("Không có chủ đề nào để tạo tình huống!");
                return;
            }
            const response = await createSituationApi(topic.title);

            this.setState(() => ({
                generatedSituations: response.situation
            }));

        } catch (error) {
            console.error("Lỗi trong createSituation:", error);
        }
    };

    createQuestionOrAnswer = async (userText = null) => {
        try {
            const { messages, generatedSituations } = this.state;
            let textToSend = userText?.trim() || generatedSituations;
            console.log("Kiểm tra textToSend:", textToSend);

            if (!textToSend) {
                console.error("Không có tình huống ban đầu hoặc tin nhắn từ người dùng để gửi!");
                return;
            }

            let newMessages = [...messages];
            // Nếu user nhập tin nhắn, thêm vào danh sách tin nhắn
            if (userText?.trim()) {
                newMessages.push({
                    id: messages.length + 1,
                    text: userText.trim(),
                    role: ROLE.USER,
                    createdAt: new Date().toISOString(),
                });
            }
            let questionOfAI = messages[messages.length - 1];
            console.log("Kiểm tra textToSend:", textToSend);
            console.log("Kiểm tra generatedSituations:", generatedSituations);
            console.log("Kiểm tra messages:", messages[messages.length - 1]);
            let response = "";
            if (questionOfAI === null || questionOfAI === undefined) {
                response = await createQuestionOrAnswerApi(textToSend);
            } else {
                response = await createQuestionOrAnswerApi1(textToSend, generatedSituations, questionOfAI);
            }

            if (!response || !response.result) {
                console.error("Lỗi API: ", response);
                return;
            } else {
                // await this.playTextToSpeech(response.result);
            }

            console.log("Kiểm tra createQuestionOrAnswer:", response);

            this.setState(prevState => ({
                questionHint: response.result || "Không có câu hỏi gợi ý",
                messages: [
                    ...prevState.messages,
                    {
                        id: prevState.messages.length + 1,
                        text: response.result || "Không có phản hồi từ AI",
                        role: ROLE.AI,
                        createdAt: new Date().toISOString(),
                    }
                ]
            }));

        } catch (error) {
            console.error("Lỗi trong createQuestionOrAnswer:", error);
        }
    };

    render() {
        const { userInfor } = this.props;
        const { isModalOpen, selectedMessage, topic, generatedSituations, selectedQuestion, hint } = this.state;

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='situation-container'>
                        <div className='situation-content'>
                            <div className='situation-title'>Chủ đề: {topic.title}</div>
                            <div className='content-top'>
                                <div className='cont left'>
                                    <div className='tle'>Tình huống</div>
                                    <div className="context">
                                        {this.state.generatedSituations || (
                                            <>
                                                Chưa có tình huống nào được tạo ra.
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className='cont right'>
                                    <div className='tle'>Gợi ý</div>
                                    {this.state.showHint && (
                                        <div className='context'>
                                            {hint || "Không có gợi ý"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='content-bottom'>
                                {this.state.messages.map(msg => (
                                    <div key={msg.id} className={`mess ${msg.role === ROLE.AI ? "received" : "sent"}`}>
                                        {msg.role === ROLE.AI &&
                                            <img className="avatar" src={logo} alt="Bot" />}
                                        <div className="box-option">
                                            {msg.role === ROLE.User && (
                                                <>
                                                    <img
                                                        className="option-icon"
                                                        src="https://img.lovepik.com/png/20231005/Cartoon-speaker-player-Volume-Icon-speaker-icons-loudspeaker-players_83590_wh860.png"
                                                        alt="Loudspeaker"
                                                        onClick={() => this.playTextToSpeech(msg.text)}
                                                        style={{ cursor: 'pointer' }}
                                                    />

                                                    <img
                                                        className="option-icon"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/768px-Google_Translate_logo.svg.png"
                                                        alt="Translate"
                                                        onClick={() => this.translateText(msg.id, msg.text)}
                                                        style={{ cursor: 'pointer' }}
                                                    />

                                                </>
                                            )}
                                            <div className="mess-box">
                                                <div className="text">
                                                    {this.state.translatedMessages[msg.id] || msg.text}
                                                </div>

                                                {msg.role === ROLE.User &&
                                                    <button className="detail-button" onClick={() => this.handleSelect(msg.id)}>
                                                        Chi tiết
                                                    </button>}
                                            </div>
                                            {msg.role === ROLE.AI && (
                                                <>
                                                    <img
                                                        className="option-icon"
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/768px-Google_Translate_logo.svg.png"
                                                        alt="Translate"
                                                        onClick={() => this.translateText(msg.id, msg.text)}
                                                        style={{ cursor: 'pointer' }}
                                                    />

                                                    <img
                                                        className="option-icon"
                                                        src="https://img.lovepik.com/png/20231005/Cartoon-speaker-player-Volume-Icon-speaker-icons-loudspeaker-players_83590_wh860.png"
                                                        alt="Loudspeaker"
                                                        onClick={() => this.playTextToSpeech(msg.text)}
                                                        style={{ cursor: 'pointer' }}
                                                    />

                                                </>
                                            )}
                                        </div>
                                        {msg.role === ROLE.User &&
                                            <img className="avatar" src={userInfor.avatar} alt="User" />}

                                    </div>
                                ))}
                                <div className='advice' onClick={this.toggleHint}>
                                    Gợi ý
                                </div>

                                <ReactMic
                                    record={this.state.isListening}
                                    className="sound-wave"
                                    onStop={this.onStop}
                                    onData={(recordedBlob) => console.log("Đang ghi âm...", recordedBlob)}
                                    strokeColor="#000000"
                                    backgroundColor="#FF4081"
                                />

                                <i className={`micro fa-solid fa-microphone ${this.state.isListening ? 'listening' : ''}`}
                                    onClick={() => {
                                        if (this.state.isListening) {
                                            this.stopListening();
                                        } else {
                                            this.startListening();
                                        }
                                    }}
                                >
                                </i>
                            </div>
                        </div>
                    </div>

                </CustomScrollbars>
                {
                    isModalOpen && (
                        <DetailModal
                            isOpen={isModalOpen}
                            onClose={this.closeModal}
                            message={selectedMessage}
                            avatar={userInfor.avatar}
                            situation={generatedSituations}
                            question={selectedQuestion}
                        />
                    )
                }
            </React.Fragment >
        );
    }
}

const mapStateToProps = (state) => ({
    userInfor: state.user.userInfor,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Situation);