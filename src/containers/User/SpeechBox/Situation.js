import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './Situation.scss';
import moment from "moment";
import { ROLE } from '../../../utils';
import logo from "../../../assets/logo.png";
<<<<<<< HEAD
=======
import DetailModal from './DetailModal';
>>>>>>> 6aee17e (Cập nhật code)
class Situation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
<<<<<<< HEAD
        };
=======
            translatedMessages: {}, // Lưu bản dịch
            isTranslatedMessages: {}, // Theo dõi trạng thái dịch của tin nhắn
            selectedMessage: null,
            isModalOpen: false,
            showHint: false,
        };

>>>>>>> 6aee17e (Cập nhật code)
    }

    componentDidMount = async () => {
        const sampleMessages = [
            { id: 1, text: "Hello! How can I assist you today?", voice: "voice1.mp3", role: "R3", createdAt: "2024-02-10T09:15:00Z" },
            { id: 2, text: "I need help with my TOEIC test preparation.", voice: "voice2.mp3", role: "R2", createdAt: "2024-02-10T09:17:30Z" },
            { id: 3, text: "Sure! Which section are you struggling with?", voice: "voice3.mp3", role: "R3", createdAt: "2024-02-10T09:19:45Z" },
<<<<<<< HEAD
            { id: 4, text: "Listening part 3 is quite difficult for me.", voice: "voice4.mp3", role: "R2", createdAt: "2024-02-10T09:22:10Z" },

            { id: 5, text: "Good morning! Have you completed your assignment?", voice: "voice5.mp3", role: "R3", createdAt: "2024-02-12T07:30:00Z" },
            { id: 6, text: "Yes, I finished it last night.", voice: "voice6.mp3", role: "R2", createdAt: "2024-02-12T07:35:45Z" },
            { id: 7, text: "Great! Let's review it together.", voice: "voice7.mp3", role: "R3", createdAt: "2024-02-12T07:40:20Z" },

            { id: 8, text: "I have a job interview tomorrow.", voice: "voice8.mp3", role: "R2", createdAt: "2024-02-14T18:50:10Z" },
            { id: 9, text: "Good luck! Do you need some tips?", voice: "voice9.mp3", role: "R3", createdAt: "2024-02-14T18:55:30Z" },

            { id: 10, text: "Happy Valentine's Day!", voice: "voice10.mp3", role: "R3", createdAt: "2024-02-14T12:00:00Z" },
            { id: 11, text: "Thank you! Wishing you a great day too!", voice: "voice11.mp3", role: "R2", createdAt: "2024-02-14T12:05:15Z" },

            { id: 12, text: "I don’t like people who take advantage of relationships to get a job.", voice: "voice12.mp3", role: "R3", createdAt: "2024-02-15T08:00:00Z" },
            { id: 13, text: "My name is Hien", voice: "voice13.mp3", role: "R2", createdAt: "2024-02-15T08:01:00Z" },
            { id: 14, text: "What makes you think you are suitable for this job?", voice: "voice14.mp3", role: "R3", createdAt: "2024-02-15T08:02:00Z" },
            { id: 15, text: "I have 5 years of experience in this field.", voice: "voice15.mp3", role: "R2", createdAt: "2024-02-15T08:03:00Z" },

            { id: 16, text: "Let's schedule a meeting for next Monday.", voice: "voice16.mp3", role: "R3", createdAt: "2024-02-16T16:30:20Z" },
            { id: 17, text: "Sure, I will be available at 10 AM.", voice: "voice17.mp3", role: "R2", createdAt: "2024-02-16T16:35:10Z" }
        ];


        const sortedMessages = sampleMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        this.setState({ messages: sortedMessages });
    }

    handleSelect = (id) => {
        console.log("Kiểm tra id chat: ", id);
=======
            { id: 4, text: "Listening part 3 is quite difficult for me.", voice: "voice4.mp3", role: "R2", createdAt: "2024-02-10T09:22:10Z" }
        ];

        const sortedMessages = sampleMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        this.setState({ messages: sortedMessages });
    }
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
>>>>>>> 6aee17e (Cập nhật code)
    }

    render() {
        const { userInfor } = this.props;
<<<<<<< HEAD
=======
        const { isModalOpen, selectedMessage } = this.state;
>>>>>>> 6aee17e (Cập nhật code)

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
<<<<<<< HEAD
                                    <div className='context'>
                                        My name is Hien
                                    </div>
                                </div>
                            </div>
                            <div className="content-bottom">
                                {this.state.messages
                                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sắp xếp tin nhắn theo thời gian
                                    .reduce((acc, msg, index, arr) => {
                                        const formattedDate = moment(msg.createdAt).format("DD/MM/YYYY HH:mm");
                                        const prevDate = index > 0 ? moment(arr[index - 1].createdAt).format("DD/MM/YYYY") : null;
                                        const currentDate = moment(msg.createdAt).format("DD/MM/YYYY");

                                        if (prevDate !== currentDate) {
                                            acc.push(
                                                <div key={`date-${msg.id}`} className="message-date">
                                                    {formattedDate}
                                                </div>
                                            );
                                        }

                                        acc.push(
                                            <div key={msg.id} className={`mess ${msg.role === ROLE.AI ? "received" : "sent"}`}>
                                                {msg.role === ROLE.AI &&
                                                    <img
                                                        className="avatar"
                                                        src={logo} alt="Bot"
                                                    />}

                                                <div className="box-option">
                                                    {msg.role === ROLE.User && (
                                                        <>
                                                            <img
                                                                className="option-icon"
                                                                src="https://img.lovepik.com/png/20231005/Cartoon-speaker-player-Volume-Icon-speaker-icons-loudspeaker-players_83590_wh860.png"
                                                                alt="Loudspeaker"
                                                                onClick={() => this.handleSelect(msg.id)}

                                                            />

                                                            <img
                                                                className="option-icon"
                                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/768px-Google_Translate_logo.svg.png"
                                                                alt="Translate"
                                                                onClick={() => this.handleSelect(msg.id)}
                                                            />
                                                        </>
                                                    )}
                                                    <div className="mess-box">
                                                        <div className="text">{msg.text}</div>
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
                                                                onClick={() => this.handleSelect(msg.id)}
                                                            />

                                                            <img
                                                                className="option-icon"
                                                                src="https://img.lovepik.com/png/20231005/Cartoon-speaker-player-Volume-Icon-speaker-icons-loudspeaker-players_83590_wh860.png"
                                                                alt="Loudspeaker"
                                                                onClick={() => this.handleSelect(msg.id)}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                                {msg.role === ROLE.User &&
                                                    <img
                                                        className="avatar"
                                                        src={userInfor.avatar} alt="User"
                                                    />}
                                            </div>
                                        );

                                        return acc;
                                    }, [])}
=======
                                    {this.state.showHint && (
                                        <div className='context'>My name is Hien</div>
                                    )}
                                </div></div>
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
>>>>>>> 6aee17e (Cập nhật code)
                            </div>

                        </div>
                    </div>
<<<<<<< HEAD

                </CustomScrollbars>
=======
                </CustomScrollbars>

                {/* Modal hiển thị chi tiết tin nhắn */}
                {isModalOpen && (
                    <DetailModal
                        isOpen={isModalOpen}
                        onClose={this.closeModal}
                        message={selectedMessage}
                    />
                )}

>>>>>>> 6aee17e (Cập nhật code)
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    userInfor: state.user.userInfor,
<<<<<<< HEAD
    exam: state.user.selectedExam,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Situation);
=======
});

export default connect(mapStateToProps)(Situation);
>>>>>>> 6aee17e (Cập nhật code)
