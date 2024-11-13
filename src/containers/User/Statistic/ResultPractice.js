import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './ResultPractice.scss';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { getAllTestResult } from '../../../services/testService';
import { getExam } from '../../../services/examService';
class ResultPractice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfor: [],
            ketQua: [],
            exams: {},
        };
    };

    componentDidMount = async () => {
        const userData = localStorage.getItem("persist:user");

        try {
            if (userData) {
                const parsedData = JSON.parse(userData);
                const userInfo = JSON.parse(parsedData.userInfor);
                this.setState({ userInfor: userInfo }, async () => {
                    const res = await getAllTestResult(this.state.userInfor.id);
                    if (res && res.tests) {
                        const ketQua = this.formatKetQua(res.tests);
                        this.setState({ ketQua }, this.fetchExamTitles);
                    } else {
                        console.error("No test results found", res);
                    }
                });
            }
        } catch (error) {
            console.error("Error fetching test results: ", error);
        }
    };

    fetchExamTitles = async () => {
        const { ketQua } = this.state;
        const uniqueExamIds = [...new Set(ketQua.map(item => item.examId))];

        const exams = {};
        await Promise.all(uniqueExamIds.map(async (examId) => {
            try {
                const response = await getExam(examId);
                exams[examId] = response.exam?.titleExam || "Title not found";
            } catch (error) {
                console.error(`Error fetching title for examId ${examId}:`, error);
            }
        }));

        const updatedKetQua = ketQua.map(item => ({
            ...item,
            titleExam: exams[item.examId]
        }));
        this.setState({ exams, ketQua: updatedKetQua });
    };

    formatKetQua = (tests) => {
        return tests.map(test => {
            const date = new Date(test.testDate);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            const correctAnswers = test.correctAnswer;
            const totalQuestions = test.totalQuestion;
            const resultString = `${correctAnswers}/${totalQuestions}`;

            const formattedTime = this.formatTime(test.testTime);

            const chiTiet = `/detail/${test.id}`;
            const loaiBai = [
                ...new Set(
                    test.TestResult_TestData.map(data =>
                        data.TestResult_QuestionData.RLQA_QuestionAndAnswerData[0].RLQA_ReadAndListenData.questionType
                    )
                )
            ];
            const sortedLoaiBai = loaiBai.sort((a, b) => {
                const partA = parseInt(a.replace("Part ", ""), 10);
                const partB = parseInt(b.replace("Part ", ""), 10);
                return partA - partB;
            });

            return {
                examId: test.examId,
                ngayLam: formattedDate,
                ketQua: resultString,
                thoiGian: formattedTime,
                chiTiet: chiTiet,
                loaiBai: sortedLoaiBai,
            };
        });
    };

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    handleChiTiet = (path) => {
        this.props.navigate(path);
    };

    renderKetQuaRow = (item, index) => (
        <tr key={index}>
            <td className="ngay-lam">
                <div>{item.ngayLam}</div>
                <div className="tags">
                    {item.loaiBai.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            </td>
            <td>{item.ketQua}</td>
            <td>{item.thoiGian}</td>
            <td>
                <button className="btn-link" onClick={() => this.handleChiTiet(item.chiTiet)}>
                    Xem chi tiết
                </button>
            </td>
        </tr>
    );

    render() {
        const { ketQua } = this.state;

        // Group ketQua entries by titleExam
        const groupedKetQua = ketQua.reduce((acc, item) => {
            const title = item.titleExam || "Unknown Title";
            if (!acc[title]) acc[title] = [];
            acc[title].push(item);
            return acc;
        }, {});

        return (
            <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                <div className="ket-qua-lam-bai-container">
                    <h3>Kết quả làm bài của bạn:</h3>
                    {Object.entries(groupedKetQua).length > 0 ? (
                        Object.entries(groupedKetQua).map(([titleExam, items], index) => (
                            <React.Fragment key={index}>
                                <div className="title-exam-header">
                                    <div className='title-name-exam'>{titleExam}</div>
                                </div>
                                <table className="ket-qua-table">
                                    <thead>
                                        <tr>
                                            <th>Ngày làm</th>
                                            <th>Kết quả</th>
                                            <th>Thời gian làm bài</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(this.renderKetQuaRow)}
                                    </tbody>
                                </table>
                            </React.Fragment>
                        ))
                    ) : (
                        <table className="ket-qua-table">
                            <tbody>
                                <tr>
                                    <td colSpan="4">Không có kết quả nào để hiển thị.</td>
                                </tr>
                            </tbody>
                        </table>
                    )}

                </div>
            </CustomScrollbars>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfor: state.user.userInfor,
    exam: state.user.selectedExam,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPractice);
