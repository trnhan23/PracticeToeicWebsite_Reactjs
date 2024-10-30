import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import CustomScrollbars from '../../../components/CustomScrollbars';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import './Practice.scss';
import { practiceExam, getAnswerExam } from '../../../services/examService';

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
            questionsData: [],
            answerExam: {},
            questionResults: {},
        };
        this.timer = null;
    }

    componentDidMount() {
        this.startTimer();
        this.handlePartChange(this.state.activePart);
    }


    componentDidUpdate(prevProps, prevState) {
        const { answers } = this.state;

        if (prevState.answers !== answers) {
            this.renderPartButtons();
        }
    }


    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleQuestionExam = async (examId, questionType) => {
        try {
            let res = await practiceExam(examId, questionType);
            if (res.errCode === 0) {
                this.setState({
                    questionsData: res.exams.data,
                });
            } else {
                console.log("Error: ", res);
            }
        } catch (e) {
            console.log("Error: ", e);
        }
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

    checkAnswers = (correctAnswers, userAnswers) => {
        const result = [];

        Object.entries(correctAnswers).forEach(([part, questions]) => {
            Object.entries(questions).forEach(([questionNumber, correctAnswer]) => {
                const userAnswer = userAnswers[part]?.[questionNumber] || undefined;
                result.push({
                    numberQuestion: parseInt(questionNumber, 10),
                    isCorrect: userAnswer === correctAnswer
                });
            });
        });

        return result;
    };


    // hàm chuẩn hoá dữ liệu khi lấy đáp án từ db
    formatCorrectAnswers = (data) => {
        const formattedAnswers = {};

        data.forEach(item => {
            const part = item.questionType;

            if (!formattedAnswers[part]) {
                formattedAnswers[part] = {};
            }

            if (item.RLQA_ReadAndListenData && Array.isArray(item.RLQA_ReadAndListenData)) {
                item.RLQA_ReadAndListenData.forEach(readAndListenData => {
                    if (readAndListenData.RLQA_QuestionAndAnswerData && Array.isArray([readAndListenData.RLQA_QuestionAndAnswerData])) {
                        const questionData = readAndListenData.RLQA_QuestionAndAnswerData;

                        formattedAnswers[part][questionData.numberQuestion] = questionData.correctAnswer;
                    }
                });
            }
        });

        return formattedAnswers;
    };

    handleSubmit = async () => {
        const { exam } = this.props;
        const { answers } = this.state;

        clearInterval(this.timer);
        let res = await getAnswerExam(exam.id);
        const correctAnswers = this.formatCorrectAnswers(res.answers.data);
        const resultAnswers = this.checkAnswers(correctAnswers, answers);

        const questionResults = {};
        resultAnswers.forEach(({ numberQuestion, isCorrect }) => {
            questionResults[numberQuestion] = isCorrect ? 'true' : 'false';
        });

        this.setState({
            answerExam: correctAnswers,
            questionResults
        });
    };

    renderPartButtons = () => {
        const { parts, answers, questionResults  } = this.state;
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
                    .map(([part, data]) => (
                        <div key={part} className="part-section">
                            <h5>{part}</h5>
                            <div className="question-grid">
                                {data.questions.map((_, idx) => {
                                    const questionNumber = getStartIndex(part) + idx;
                                    const hasAnswer = answers[part] && answers[part][questionNumber];
                                    const resultClass = questionResults[questionNumber] || '';
                                    return (
                                        <button
                                            key={questionNumber}
                                            className={`question-button ${hasAnswer ? 'selected' : ''} ${resultClass}`}
                                            onClick={() => {
                                                console.log("Kiểm tra questionNumber: ", questionNumber)
                                                this.handlePartChange(part)
                                            }}
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

    // hàm khôi phục đáp án khi thay đổi part
    restoreAnswers = (part) => {
        const answers = this.state.answers[part];
        if (Object.keys(answers).length > 0) {
            Object.entries(answers).forEach(([questionNumber, answer]) => {
                const input = document.querySelector(`input[name="question-${part}-${questionNumber}"][value="${answer}"]`);
                if (input) {
                    input.checked = true;
                }
            });
        }
    };

    handlePartChange = (part) => {
        const { exam } = this.props;

        this.setState((prevState) => ({
            activePart: part,
            answers: {
                ...prevState.answers,
                [part]: prevState.answers[part] || {},
            },
        }), () => {
            this.restoreAnswers(part);
            this.handleQuestionExam(exam.id, part);
        });
    };

    renderAudioBar = (audioFile) => {
        return (
            <audio controls className="audio-bar">
                <source src={audioFile} type="audio/mp3" />
                Trình duyệt của bạn không hỗ trợ âm thanh.
            </audio>
        );
    };

    renderQuestions = () => {
        const { activePart } = this.state;
        if (["Part 1", "Part 2", "Part 5"].includes(activePart)) {
            return this.renderPart125();
        } else if (["Part 3", "Part 4"].includes(activePart)) {
            return this.renderPart34();
        } else if (["Part 6", "Part 7"].includes(activePart)) {
            return this.renderPart67();
        }
        return null;
    };

    getStartIndex = (part) => {
        const { parts } = this.state;
        let index = 1;

        for (let key of Object.keys(parts)) {
            if (key === part) break;
            index += parts[key].questions.length;
        }
        return index;
    };

    renderPart67 = () => {
        const { activePart, answers, questionsData } = this.state;
        if (!["Part 6", "Part 7"].includes(activePart)) return null;

        return (
            <div className="questions-container">
                {questionsData
                    .filter(q => q.questionType === activePart)
                    .map((partData, index) => {

                        return (
                            <div key={partData.id} className="question-item">

                                {/* Text */}
                                {partData.text && (
                                    <div className="text-container">
                                        {partData.text}
                                    </div>
                                )}

                                {partData.RLQA_ReadAndListenData.map((questionData, qIndex) => {
                                    const question = questionData.RLQA_QuestionAndAnswerData;

                                    return (
                                        <div key={question.id} className="question-item">
                                            <span>{`${question.numberQuestion}`}</span>

                                            <div className="answer-choices">
                                                {/* Câu hỏi */}
                                                <div className="question-text">
                                                    {question.questionText}
                                                </div>

                                                {/* Đáp án */}
                                                {['A', 'B', 'C', 'D'].map((choice) => (
                                                    <label key={choice} className="choice-label">
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.numberQuestion}`}
                                                            value={choice}
                                                            checked={answers[activePart] && answers[activePart][question.numberQuestion] === choice}
                                                            onChange={() =>
                                                                this.handleAnswerChange(activePart, question.numberQuestion, choice)
                                                            }
                                                            className="choice-input"
                                                        />
                                                        {choice}. {question[`answer${choice}`]}
                                                        <br />
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        );
    }

    renderPart34 = () => {
        const { activePart, answers, questionsData } = this.state;
        if (!["Part 3", "Part 4"].includes(activePart)) return null;
        return (
            <div className="questions-container">
                {questionsData
                    .filter(q => q.questionType === activePart)
                    .map((partData, index) => {

                        return (
                            <div key={partData.id} className="question-item">
                                {/* Âm thanh */}
                                {partData.audioFile && (
                                    <audio controls className="audio-bar">
                                        <source src={partData.audioFile} type="audio/mp3" />
                                    </audio>
                                )}

                                {/* Hình ảnh */}
                                {partData.images && (
                                    <div className="image-container">
                                        <img src={partData.images} alt="Part 3" className="question-image" />
                                    </div>
                                )}

                                {partData.RLQA_ReadAndListenData.map((questionData, qIndex) => {
                                    const question = questionData.RLQA_QuestionAndAnswerData;
                                    return (
                                        <div key={question.id} className="question-item">
                                            <span>{`${question.numberQuestion}`}</span>

                                            <div className="answer-choices">
                                                {/* Câu hỏi */}
                                                <div className="question-text">
                                                    {question.questionText}
                                                </div>

                                                {/* Đáp án */}
                                                {['A', 'B', 'C', 'D'].map((choice) => (
                                                    <label key={choice} className="choice-label">
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.numberQuestion}`}
                                                            value={choice}
                                                            checked={answers[activePart] && answers[activePart][question.numberQuestion] === choice}
                                                            onChange={() => {
                                                                this.handleAnswerChange(activePart, question.numberQuestion, choice);
                                                            }}
                                                            className="choice-input"
                                                        />
                                                        {choice}. {question[`answer${choice}`]}
                                                        <br />
                                                    </label>

                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        );
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
        }), () => {
            console.log("Kiểm tra đáp án: ", this.state.answers);
        });
    };

    renderPart125 = () => {
        const { activePart, answers, questionsData } = this.state;
        if (!["Part 1", "Part 2", "Part 5"].includes(activePart)) return null;

        return (
            <div className="questions-container">
                {questionsData
                    .filter(q => q.questionType === activePart)
                    .map((partData, index) => {

                        return (
                            <div key={partData.id} className="question-item">
                                {partData.RLQA_ReadAndListenData.map((questionData, qIndex) => {
                                    const question = questionData.RLQA_QuestionAndAnswerData;

                                    return (
                                        <div key={question.id} className="question-item">
                                            <span>{`${question.numberQuestion}`}</span>

                                            {/* Thanh âm thanh */}
                                            {partData.audioFile && (
                                                <audio controls className="audio-bar">
                                                    <source src={partData.audioFile} type="audio/mp3" />
                                                    Trình duyệt của bạn không hỗ trợ âm thanh.
                                                </audio>
                                            )}

                                            {/* Hiển thị hình ảnh nếu là Part 1 */}
                                            {activePart === "Part 1" && partData.images && (
                                                <div className="image-container">
                                                    <img src={partData.images} alt="Part 1" className="question-image" />
                                                </div>
                                            )}

                                            {/* Đáp án */}
                                            <div className="answer-choices">
                                                {(activePart === "Part 2" || activePart === "Part 5") && (
                                                    <div className="question-text">
                                                        {question.questionText}
                                                    </div>
                                                )}
                                                {(activePart === "Part 1" ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C']).map((choice) => (
                                                    <label key={choice} className="choice-label">
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.numberQuestion}`}
                                                            value={choice}
                                                            checked={answers[activePart] && answers[activePart][question.numberQuestion] === choice}
                                                            onChange={() =>
                                                                this.handleAnswerChange(activePart, question.numberQuestion, choice)
                                                            }
                                                            className="choice-input"
                                                        />
                                                        {choice}. {question[`answer${choice}`]}
                                                        <br />
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        );
    };

    render() {
        const { selectedParts, exam } = this.props;
        const { activePart, remainingTime } = this.state;

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className="luyen-tap-layout">
                        <div className="header">
                            <h3>{exam.titleExam}</h3>
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

                                <div className="questions-view">
                                    {this.renderQuestions()}
                                </div>

                            </div>
                            <div className="right-panel">
                                <h4>Thời gian còn lại: </h4>
                                <h4 className='time'>{this.formatTime(remainingTime)}</h4>
                                <button className="submit-button" onClick={this.handleSubmit}>
                                    Nộp bài
                                </button>
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