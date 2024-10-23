import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import CustomScrollbars from '../../../components/CustomScrollbars';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import './Practice.scss';
class Practice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePart: (this.props.selectedParts && this.props.selectedParts[0]) || 'Part 1',
            remainingTime: 120 * 60,
            parts: {
                'Part 1': { questions: Array(6).fill('Question'), hasAudio: true, choices: 4 },
                'Part 2': { questions: Array(25).fill('Question'), hasAudio: true, choices: 3 },
                'Part 3': { questions: Array(39).fill('Question'), hasAudio: true, choices: 4 },
                'Part 4': { questions: Array(30).fill('Question'), hasAudio: true, choices: 4 },
                'Part 5': { questions: Array(30).fill('Question'), hasAudio: false, choices: 4 },
                'Part 6': { questions: Array(16).fill('Question'), hasAudio: false, choices: 4 },
                'Part 7': { questions: Array(54).fill('Question'), hasAudio: false, choices: 4 },
            },
            answers: {},
        };
        this.timer = null;
    }

    componentDidMount() {
        this.startTimer();
    }
    

    componentDidUpdate(prevProps) {
        if (prevProps.selectedParts !== this.props.selectedParts) {
            const newPart = this.props.selectedParts[0] || 'Part 1';
            this.setState({ activePart: newPart });
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.remainingTime > 0) {
                    return { remainingTime: prevState.remainingTime - 1 };
                } else {
                    clearInterval(this.timer);
                    alert('Hết thời gian làm bài!');
                    return { remainingTime: 0 };
                }
            });
        }, 1000);
    };

    formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    handleSubmit = () => {
        clearInterval(this.timer);
        alert('Bài thi đã được nộp!');
    };

    handlePartChange = (part) => {
        this.restoreAnswers(part);
        this.setState({ activePart: part });
    };

    handleAnswerChange = (part, questionIndex, answer) => {
        this.setState((prevState) => ({
            answers: {
                ...prevState.answers,
                [part]: {
                    ...prevState.answers[part],
                    [questionIndex]: answer,
                },
            },
        }));
    };

    renderQuestions = () => {
        const { activePart, parts, answers } = this.state;
        const partData = parts[activePart];
        const answerChoices = ['A', 'B', 'C', 'D'].slice(0, partData.choices);

        return (
            <div className="questions-container">
                {partData.questions.map((q, index) => (
                    <div key={index} className="question-item">
                        <span>{`${index + 1}`}</span>
                        <div className="answer-choices">
                            {answerChoices.map((choice) => (
                                <label key={choice} className="choice-label">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={choice}
                                        checked={
                                            answers[activePart] &&
                                            answers[activePart][index] === choice
                                        }
                                        onChange={() =>
                                            this.handleAnswerChange(activePart, index, choice)
                                        }
                                        className="choice-input"
                                    />
                                    {choice}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    renderAudioBar = () => {
        const { activePart } = this.state;
        const showAudioBar = ['Part 1', 'Part 2', 'Part 3', 'Part 4'].includes(activePart);

        return (
            showAudioBar && (
                <audio controls className="audio-bar">
                    <source src={`/audio/${activePart}.mp3`} type="audio/mp3" />
                    Trình duyệt của bạn không hỗ trợ âm thanh.
                </audio>
            )
        );
    };

    renderQuestions = (startIndex) => {
        const { activePart, parts, answers } = this.state;
        const partData = parts[activePart];
        const answerChoices = ['A', 'B', 'C', 'D'].slice(0, partData.choices);
    
        return (
            <div className="questions-container">
                {partData.questions.map((q, index) => {
                    const globalIndex = startIndex + index; // Tính số thứ tự câu hỏi
    
                    return (
                        <div key={index} className="question-item">
                            <span>{`${globalIndex}`}</span>
                            <div className="answer-choices">
                                {answerChoices.map((choice) => (
                                    <label key={choice} className="choice-label">
                                        <input
                                            type="radio"
                                            name={`question-${globalIndex}`}
                                            value={choice}
                                            checked={
                                                answers[activePart] &&
                                                answers[activePart][index] === choice
                                                ? true
                                                : false  // Thêm điều kiện kiểm tra để tránh undefined
                                            }
                                            onChange={() =>
                                                this.handleAnswerChange(activePart, index, choice)
                                            }
                                            className="choice-input"
                                        />
                                        {choice}
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };
    

    getStartIndex = (part) => {
        const { parts } = this.state;
        let index = 1; // Câu đầu tiên bắt đầu từ 1

        for (let key of Object.keys(parts)) {
            if (key === part) break; // Khi tới Part hiện tại thì dừng lại
            index += parts[key].questions.length; // Cộng số câu của các Part trước đó
        }
        return index;
    };

    renderPartButtons = () => {
        const { parts } = this.state;
        const { selectedParts } = this.props;

        const getStartIndex = (part) => {
            let index = 1;
            for (let key of Object.keys(parts)) {
                if (key === part) break;
                index += parts[key].questions.length;
            }
            return index;
        };

        return (
            <div className="part-question-wrapper">
                {Object.entries(parts)
                    .filter(([part]) => selectedParts.includes(part))
                    .map(([part, data], index) => (
                        <div key={index} className="part-section">
                            <h5>{part}</h5>
                            <div className="question-grid">
                                {data.questions.map((_, idx) => {
                                    const questionNumber = getStartIndex(part) + idx;

                                    return (
                                        <button
                                            key={idx}
                                            className="question-button"
                                            onClick={() => this.handlePartChange(part)}
                                        >
                                            {questionNumber}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
            </div>
        );
    };

    // Hàm lưu đáp án đã chọn
    saveAnswers = () => {
        const { activePart, answers } = this.state;

        // Lưu đáp án của Part hiện tại vào localStorage
        localStorage.setItem(`answers-${activePart}`, JSON.stringify(answers[activePart] || {}));
        alert(`Đã lưu bài làm của ${activePart}!`);
    };

    // Hàm khôi phục đáp án từ localStorage
    restoreAnswers = (part) => {
        const savedAnswers = JSON.parse(localStorage.getItem(`answers-${part}`)) || {};
        this.setState((prevState) => ({
            answers: {
                ...prevState.answers,
                [part]: savedAnswers,
            },
        }));
    };

    handlePartChange = (part) => {
        this.setState((prevState) => {
            // Kiểm tra nếu answers của part mới chưa có trong state, khởi tạo nó
            if (!prevState.answers[part]) {
                return {
                    activePart: part,
                    answers: {
                        ...prevState.answers,
                        [part]: {}, // Khởi tạo object rỗng cho part mới
                    },
                };
            }
            return {
                activePart: part,
            };
        });
        this.restoreAnswers(part); // Khôi phục đáp án từ localStorage nếu có
    };
    

    render() {
        const { selectedParts } = this.props;
        const { activePart, remainingTime } = this.state;

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className="luyen-tap-layout">
                        <div className="header">
                            <h3>Practice Set TOEIC 2020 Test 1</h3>
                            <button className='out'>Thoát</button>
                        </div>
                        <div className="main-content">
                            <div className="content">
                                <div className="parts-selector">
                                    {Object.keys(this.state.parts)
                                        .filter(part => selectedParts.includes(part))
                                        .map((part) => (
                                            <button
                                                key={part}
                                                className={`part-tab ${this.state.activePart === part ? 'active' : ''}`}
                                                onClick={() => this.handlePartChange(part)}
                                            >
                                                {part}
                                            </button>
                                        ))}
                                </div>
                                {this.renderAudioBar()}
                                <div className="questions-view">
                                    {this.renderQuestions(this.getStartIndex(activePart))}
                                </div>

                            </div>
                            <div className="right-panel">
                                <h4>Thời gian còn lại: </h4>
                                <h4 className='time'>{this.formatTime(remainingTime)}</h4>
                                <button className="submit-button" onClick={this.handleSubmit}>
                                    Nộp bài
                                </button>
                                <p className='p1' onClick={this.saveAnswers}>
                                    Khôi phục/ lưu bài làm <i className="fa-solid fa-chevron-right"></i>
                                </p>

                                <p className='p2'> Chú ý:Bạn có thể click vào số thứ tự câu hỏi trong bài để đánh dấu review</p>
                                {this.renderPartButtons()}
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
        exam: state.user.selectedExam,
        selectedParts: state.user.selectedParts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
