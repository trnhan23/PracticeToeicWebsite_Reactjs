import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './Situation.scss';
import moment from "moment";
import { ROLE } from '../../../utils';
import logo from "../../../assets/logo.png";
import { ReactMic } from "react-mic";
import axios from "axios";

import DetailModal from './DetailModal';
class Situation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            translatedMessages: {},
            isTranslatedMessages: {},
            selectedMessage: null,
            isModalOpen: false,
            showHint: false,
            isListening: false,
            blobURL: null,
            audioBlob: null,
        };

    }

    async componentDidMount() {
        const sampleMessages = [
            { id: 1, text: "Hello! How can I assist you today?", voice: "voice1.mp3", role: "R3", createdAt: "2024-02-10T09:15:00Z" },
            { id: 2, text: "I need help with my TOEIC test preparation.", voice: "voice2.mp3", role: "R2", createdAt: "2024-02-10T09:17:30Z" },
            { id: 3, text: "Sure! Which section are you struggling with?", voice: "voice3.mp3", role: "R3", createdAt: "2024-02-10T09:19:45Z" },
        ];

        const sortedMessages = sampleMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        this.setState({ messages: sortedMessages });


        if ("webkitSpeechRecognition" in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = "en-US";
            recognition.onresult = this.handleSpeechResult;
            this.setState({ recognition });
        } else {
            alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
        }
    }

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
        const translations = {
            "Hello! How can I assist you today?": "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
            "I need help with my TOEIC test preparation.": "Tôi cần giúp đỡ trong việc luyện thi TOEIC.",
            "Sure! Which section are you struggling with?": "Chắc chắn rồi! Bạn đang gặp khó khăn ở phần nào?",
            "Listening part 3 is quite difficult for me.": "Phần nghe số 3 khá khó đối với tôi."
        };

        this.setState(prevState => {
            const isTranslated = prevState.isTranslatedMessages[id] || false;
            return {
                translatedMessages: {
                    ...prevState.translatedMessages,
                    [id]: isTranslated ? text : (translations[text] || "Bản dịch chưa có")
                },
                isTranslatedMessages: {
                    ...prevState.isTranslatedMessages,
                    [id]: !isTranslated
                }
            };
        });
    };
    handleSelect = (id) => {
        const selectedMessage = this.state.messages.find(msg => msg.id === id);
        this.setState({ selectedMessage, isModalOpen: true });
    }
    toggleHint = () => {
        this.setState((prevState) => ({ showHint: !prevState.showHint }));
    };


    closeModal = () => {
        this.setState({ isModalOpen: false, selectedMessage: null });

    }

    render() {
        const { userInfor } = this.props;


        const { isModalOpen, selectedMessage } = this.state;


        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='situation-container'>
                        <div className='situation-content'>
                            <div className='situation-title'>Chủ đề: FOOD</div>
                            <div className='content-top'>
                                <div className='cont left'>
                                    <div className='tle'>Tình huống</div>
                                    <div className='context'>
                                        Người yêu dẫn bạn về nhà chơi.
                                        Thật trớ trêu bố cô, ông Minh là giám đốc một công ty
                                        Ông hiểu nhầm con gái mình mang ứng viên đi cửa sau.
                                        Vậy mới có một buổi phỏng vấn cùng nhạc phụ đại nhân tương lại
                                    </div>
                                </div>
                                <div className='cont right'>
                                    <div className='tle'>Gợi ý</div>
                                    {this.state.showHint && (
                                        <div className='context'>
                                            My name is Hien
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

                                <i className={`fa-solid fa-microphone ${this.state.isListening ? 'listening' : ''}`}
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

                { }
                {
                    isModalOpen && (
                        <DetailModal
                            isOpen={isModalOpen}
                            onClose={this.closeModal}
                            message={selectedMessage}
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

