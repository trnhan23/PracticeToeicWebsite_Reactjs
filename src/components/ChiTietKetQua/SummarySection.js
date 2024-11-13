import React, { useEffect, useState } from "react";
import './SummarySection.scss';
import { getDetailTestResult, getTitleExam } from '../../services/testService';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { push } from "connected-react-router";
const SummarySection = () => {
    const [data, setData] = useState({
        testId: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        skipAnswer: 0,
        countListenAnswer: 0,
        countReadAnswer: 0,
        listenScore: 0,
        readingScore: 0,
        totalQuestion: 0,
        score: 0,
        testTime: 0,
        parts: [],
        
    });
    const [title, setTitle] = useState('');
    const history = useHistory();

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            const testId = localStorage.getItem('testId');
            if (testId) {
                try {
                    const response = await getDetailTestResult(testId);
                    if (response.tests) {
                        setData({
                            testId: response.tests.testId,
                            correctAnswer: response.tests.correctAnswer || 0,
                            incorrectAnswer: response.tests.incorrectAnswer || 0,
                            skipAnswer: response.tests.skipAnswer || 0,
                            countListenAnswer: response.tests.countListenAnswer || 0,
                            countReadAnswer: response.tests.countReadAnswer || 0,
                            listenScore: response.tests.listenScore || 0,
                            readingScore: response.tests.readingScore || 0,
                            totalQuestion: response.tests.totalQuestion || 0,
                            score: response.tests.score || 0,
                            testTime: formatTime(response.tests.testTime),
                            parts: response.tests.parts,
                        });
                    }

                    const res = await getTitleExam(testId);
                    setTitle(res?.tests?.[0]?.Test_ExamData?.titleExam || 'Unknown Title');
                } catch (error) {
                    console.error("Error fetching test result:", error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    }, [title]);

    return (
        <div className="summary-section">
            <div className="content-top1">
                <div className="title">{title}</div>
                <div className="tags">
                    {data.parts.map((part, index) => (
                        <span key={index} className="tag">{part}</span>
                    ))}
                </div>
            </div>

            <div className="answer-exam">
                {/* <div className="answer"><button onClick={handleShowResult}>Xem đáp án</button></div> */}
                <div className="exam"><button onClick={() => history.goBack()}>Quay về trang đề thi</button></div>
            </div>

            <div className="result-metrics">
                <div className="content-left">
                    <div className="metric">
                        <div className="name"><i className="fas fa-check"></i>Kết quả làm bài</div>
                        <div className="score">{data.correctAnswer}/{data.totalQuestion}</div>
                    </div>

                    <div className="metric">
                        <div className="name"><i className="fas fa-bullseye"></i>Độ chính xác</div>
                        <div className="score">{((data.correctAnswer / data.totalQuestion) * 100).toFixed(1)}%</div>
                    </div>

                    <div className="metric">
                        <div className="name"><i className="far fa-clock"></i>Thời gian hoàn thành</div>
                        <div className="score">{data.testTime}</div>
                    </div>
                </div>

                <div className="content-right">
                    <div className="top">
                        <div className="metric">
                            <div className="icon"><i className="fas fa-check-circle"></i></div>
                            <div className="name-green">Trả lời đúng</div>
                            <div className="score">{data.correctAnswer}</div>
                            <div className="question">câu hỏi</div>
                        </div>
                        <div className="metric">
                            <div className="icon"><i className="fas fa-times-circle"></i></div>
                            <div className="name-red">Trả lời sai</div>
                            <div className="score">{data.incorrectAnswer}</div>
                            <div className="question">câu hỏi</div>
                        </div>
                        <div className="metric">
                            <div className="icon"><i className="fas fa-minus-circle"></i></div>
                            <div className="name-gray">Bỏ qua</div>
                            <div className="score">{data.skipAnswer}</div>
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
                            <div className="score">{data.listenScore}/495</div>
                            <div className="name">Trả lời đúng: {data.countListenAnswer}/100</div>
                        </div>
                        <div className="skill">
                            <div className="name">Reading</div>
                            <div className="score">{data.readingScore}/495</div>
                            <div className="name">Trả lời đúng: {data.countReadAnswer}/100</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfor: state.user.userInfor,
    exam: state.user.selectedExam,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummarySection);
