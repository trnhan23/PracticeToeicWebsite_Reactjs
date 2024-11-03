import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import './KetQuaLamBai.scss';
import { getTestResult } from '../../services/testService';

class KetQuaLamBai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ketQua: [],
        };
    }

    componentDidMount = async () => {
        const { exam, userInfor } = this.props;
        try {
            const res = await getTestResult(exam.id, userInfor.id);
            if (res && res.tests) {
                const ketQua = this.formatKetQua(res.tests);
                this.setState({ ketQua });
            } else {
                console.error("No test results found", res);
            }
        } catch (error) {
            console.error("Error fetching test results: ", error);
        }
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
                    {/* {item.chiTiet} dạng /detail/{id của test} */}
                    Xem chi tiết 
                </button>
            </td>
        </tr>
    );

    render() {
        const { ketQua } = this.state;

        return (
            <div className="ket-qua-lam-bai-container">
                <h3>Kết quả làm bài của bạn:</h3>
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
                        {ketQua.length > 0 ? (
                            ketQua.map(this.renderKetQuaRow)
                        ) : (
                            <tr>
                                <td colSpan="4">Không có kết quả nào để hiển thị.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(KetQuaLamBai);
