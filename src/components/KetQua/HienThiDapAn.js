import React, { Component } from 'react';
import './HienThiDapAn.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAnswerByPart, practiceExam } from '../../services/examService';
import CustomScrollbars from '../CustomScrollbars';
import HomeHeader from '../../containers/User/HomePage/HomeHeader';
import HomeFooter from '../../containers/User/HomePage/HomeFooter';

class HienThiDapAn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePart: 'Part 1',
            parts: [],
            answers: {},
            questionsData: []
        };
    }

    async componentDidMount() {
        await this.fetchAnswers();
        const { part } = this.props.match.params;
        const { exam } = this.props;

        if (part === 'all') {
            this.setState({
                activePart: 'Part 1',
                parts: ['Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7'],

            });
        } else {
            this.setState({
                activePart: part,
            });
        }

        if (this.state.activePart === 'Part 1' || this.state.activePart === 'Part 2') {
            this.handleQuestionExam(exam.id, this.state.activePart);
        }
    }

    async componentDidUpdate(prevProps) {
        const { exam, match } = this.props;
        const { part } = match.params;

        if ((exam && exam.id !== prevProps.exam.id) || (part !== prevProps.match.params.part)) {
            await this.fetchAnswers();
            this.setState({
                activePart: part,
            }, () => {
                if (this.state.activePart === 'Part 1' || this.state.activePart === 'Part 2') {
                    this.handleQuestionExam(exam.id, this.state.activePart);
                }
            });
        }
    }

    renderPartButtons = () => {
        const { answers } = this.state;
        const answersData = answers || {};

        return (
            <div className="part-question-wrapper">
                {Object.entries(answersData).map(([part, questions]) => (
                    <div key={part} className="part-section">
                        <h5>{part}</h5>
                        <div className="question-grid">
                            {Object.entries(questions).map(([questionNumber, answer]) => (
                                <button
                                    key={questionNumber}
                                    className="question-button"
                                >
                                    {questionNumber}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // lấy đáp án từ API theo từng phần
    fetchAnswers = async () => {
        const { exam, match } = this.props;
        const { part } = match.params;

        if (exam && exam.id) {
            try {
                const res = await getAnswerByPart(exam.id, part);
                this.setState({ answers: res.answers.data });
            } catch (error) {
                console.error("Error fetching answers: ", error);
            }
        }
    };

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

    handlePartChange = (part) => {
        const { exam } = this.props
        this.setState({
            activePart: part
        }, () => {
            if (this.state.activePart === 'Part 1' || this.state.activePart === 'Part 2') {
                this.handleQuestionExam(exam.id, this.state.activePart);
            }
        });
    };

    renderQuestions = () => {
        const { activePart } = this.state;
        if (["Part 3", "Part 4", "Part 5", "Part 6", "Part 7"].includes(activePart)) {
            return this.renderPart34567();
        } else if (["Part 1", "Part 2"].includes(activePart)) {
            return this.renderPart12();
        }
        return null;
    };

    renderPart12 = () => {
        const { activePart, questionsData } = this.state;
        if (!["Part 1", "Part 2"].includes(activePart)) return null;

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

                                            {/* Hiển thị hình ảnh nếu là Part 1 */}
                                            {activePart === "Part 1" && partData.images && (
                                                <div className="image-container">
                                                    <img src={partData.images} alt="Part 1" className="question-image" />
                                                </div>
                                            )}

                                            {/* Đáp án */}
                                            <div className="answer-choices">
                                                <div className='transcript'>Transcript</div>

                                                {(activePart === "Part 2") && (
                                                    <div className="question-text">
                                                        {question.questionText}
                                                    </div>
                                                )}
                                                {(activePart === "Part 1" ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C']).map((choice) => (
                                                    <label key={choice} className="choice-label">
                                                        {choice}. {question[`answer${choice}`]}
                                                        <br />
                                                    </label>
                                                ))}
                                                <div className='answer'>Đáp án đúng: {question.correctAnswer}</div>

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

    renderPart34567 = () => {
        const { activePart, answers } = this.state;
        const answersData = answers || {};

        // Kiểm tra xem activePart có phải là một phần hợp lệ không
        if (!["Part 3", "Part 4", "Part 5", "Part 6", "Part 7"].includes(activePart)) return null;

        return (
            <div className='questions-container'>
                {Object.entries(answersData).map(([part, questions]) => {
                    if (part !== activePart) return null;
                    return (
                        <div key={part}>
                            {Object.entries(questions).map(([questionNumber, answer]) => (
                                <div key={questionNumber} className='question-answer'>
                                    <span className='question-item'>{questionNumber}: </span>
                                    <span className='answer-item'>Đáp án đúng: {answer}</span>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }


    render() {
        const { parts } = this.state;
        const { exam } = this.props;

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className="luyen-tap-layout">
                        <div className="header">
                            <h3>Đáp án: {exam.titleExam}</h3>
                            <button className='out'>Thoát</button>
                        </div>
                        <div className="main-content">
                            <div className="content">
                                <div className="parts-selector">
                                    {parts.map((part) => (
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
        exam: state.user.selectedExam
    };
};

export default connect(mapStateToProps)(withRouter(HienThiDapAn));
