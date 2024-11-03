import React from "react";
import './SummarySection.scss';
const SummarySection = ({ data }) => {
    return (
        <div className="summary-section">
            <div className="content-top1">
                <div className="title">Kết quả thi: Practice Set TOEIC 2020 Test 1</div>
                <div className="tags">
                    <span className="tag">Part 1</span>
                </div>
            </div>

            <div className="answer-exam">
                <div className="answer"><button>Xem chi tiết đáp án</button></div>
                <div className="exam"><button>Quay về trang đề thi</button></div>
            </div>

            <div className="result-metrics">

                <div className="content-left">
                    <div className="metric">
                        <div className="name"><i className="fas fa-check"></i>Kết quả làm bài</div>
                        <div className="score">{data.correctAnswers}/{data.totalQuestions}</div>
                    </div>

                    <div className="metric">
                        <div className="name"><i className="fas fa-bullseye"></i>Độ chính xác</div>
                        <div className="score">60.0%</div>
                    </div>

                    <div className="metric">
                        <div className="name"><i className="far fa-clock"></i>Thời gian hoàn thành</div>
                        <div className="score">{data.completionTime}</div>
                    </div>
                </div>

                <div className="content-right">
                    <div className="top">
                        <div className="metric">
                            <div className="icon"><i className="fas fa-check-circle"></i></div>
                            <div className="name-green">Trả lời đúng</div>
                            <div className="score">{data.correctAnswers}</div>
                            <div className="question">câu hỏi</div>
                        </div>
                        <div className="metric">
                            <div className="icon"><i className="fas fa-times-circle"></i></div>
                            <div className="name-red">Trả lời sai</div>
                            <div className="score">{data.incorrectAnswers}</div>
                            <div className="question">câu hỏi</div>
                        </div>
                        <div className="metric">
                            <div className="icon"><i className="fas fa-minus-circle"></i></div>
                            <div className="name-gray">Bỏ qua</div>
                            <div className="score">{data.skippedAnswers}</div>
                            <div className="question">câu hỏi</div>
                        </div>
                        <div className="metric">
                            <div className="icon"><i className="fas fa-flag"></i></div>
                            <div className="name-blue">Điểm</div>
                            <div className="score-score">{data.score}</div>
                        </div>
                    </div>

                    <div className="bottom">
                        <div className="skill">
                            <div className="name">Listening</div>
                            <div className="score">{data.listeningScore}</div>
                            <div className="name">Trả lời đúng: {data.incorrectAnswers}/100</div>
                        </div>
                        <div className="skill">
                            <div className="name">Reading</div>
                            <div className="score">{data.readingScore}</div>
                            <div className="name">Trả lời đúng: {data.incorrectAnswers}/100</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummarySection;
