import React, { Component } from 'react';
import './ThongTinDeThi.scss';
import { connect } from 'react-redux';
import KetQuaLamBai from '../KetQua/KetQuaLamBai';
import PhanThi from '../KetQua/PhanThi';
import { Link } from 'react-router-dom';
import { getExam } from '../../services/examService';
class ThongTinDeThi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 'info',
            exam: [],
            examId: this.props.exam.id,
            parts: ["Part 1", "Part 2", "Part 3", "Part 4", "Part 5", "Part 6", "Part 7"],
        };
    }

    componentDidMount = async () => {
        const { exam } = this.props;

        try {
            const res = await getExam(this.state.examId);

            if (res && res.exam) {
                this.setState({
                    exam: {
                        ...exam,
                        countUserTest: res.exam.countUserTest
                    }
                });
            }

        } catch (error) {
            console.error("Failed to fetch exam data: ", error);
        }
    };

    handleButtonClick = (buttonType) => {
        this.setState({ activeButton: buttonType });
    }

    render() {
        const { activeButton, exam } = this.state;
        const renderContent = () => {
            if (activeButton === 'info') {
                return (
                    <>
                        <div className="test-details">
                            <span className="test-time">
                                <i className="far fa-clock"></i>
                                <p>Thời gian làm bài: 120 phút  |</p>
                                <p>7 phần thi  |</p>
                                <p>200 câu hỏi |</p>
                                <p>{exam ? exam.countComment : "0"} bình luận</p>
                            </span>
                        </div>
                        <div className="test-participation">
                            <span className="test-participant-info">
                                <i className="far fa-user"></i>
                                {exam ? exam.countUserTest : "0"} người đã luyện tập đề thi này
                            </span>
                        </div>
                        {(exam.statusExam === true ? (<div className='ket-qua-lam-bai'>
                            <KetQuaLamBai />
                        </div>) : '')}

                        <div className='phan-thi'>
                            <PhanThi />
                        </div>
                    </>
                );
            } else {
                return (
                    <div className='test-answer'>
                        <div className='top-answer'>
                            <Link to={`/hien-thi-dap-an/all`}>Xem đáp án đề thi</Link>
                        </div>
                        <div className='bottom-answer'>
                            <div>Các phần thi:</div>
                            <ul>
                                {this.state.parts.map((part, index) => (
                                    <li key={index}>
                                        {part}: <Link to={`/hien-thi-dap-an/${part}`}>Đáp án</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="test-info-container">
                <h2 className="test-title">
                    {exam ? exam.titleExam : "Không có đề thi"}
                    {exam.statusExam ? (
                        <i className="fas fa-check-circle"></i>
                    ) : ''}
                </h2>
                <div className="test-actions">
                    <button
                        className={`test-action-button ${activeButton === 'info' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('info')}
                    >
                        Thông tin đề thi
                    </button>
                    <button
                        className={`test-action-button ${activeButton === 'transcript' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('transcript')}
                    >
                        Đáp án
                    </button>
                </div>
                {renderContent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
        exam: state.user.selectedExam
    };
};

export default connect(mapStateToProps)(ThongTinDeThi);
