import React, { Component } from 'react';
import './ThongTinDeThi.scss';
import { connect } from 'react-redux';

class ThongTinDeThi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: 'info',
            exam: [],
        };
    }

    componentDidMount = () => {
        const { exam } = this.props;
        this.setState({
            exam: exam
        })

    }

    handleButtonClick = (buttonType) => {
        this.setState({ activeButton: buttonType });
    }

    render() {
        const { activeButton, exam } = this.state;

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
                        Đáp án / Transcript
                    </button>
                </div>
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
