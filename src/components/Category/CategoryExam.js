import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CategoryExam.scss'
import { path } from '../../utils';
import { push } from "connected-react-router";
import { selectExam } from '../../store/actions';
class CategoryExam extends Component {

    handleExam = (exam) => {
        this.props.selectExam(exam);
        this.props.navigate(path.TT_DETHI);
    }


    render() {
        const { exams } = this.props;
        return (
            <React.Fragment>
                <div className="home-test-container">
                    <div className="toeic-test-grid">
                        {
                            exams && exams.length > 0 ? (
                                exams.map(exam => (
                                    <div className="toeic-test-card" key={exam.id}>
                                        <div className='card-name'>
                                            {exam.statusExam ? (
                                                <i className="fas fa-check-circle"></i>
                                            ) : ''}
                                            {exam.titleExam}
                                        </div>

                                        <div className="test-details">
                                            <span><i className="far fa-clock"></i> 120 phút</span>
                                            <span><i className="far fa-user"></i> {exam.countUserTest}</span>
                                        </div>
                                        <div className="test-info">
                                            <span><i className="far fa-comments"></i> {exam.countComment}</span>
                                            <span><br />7 phần thi | 120 câu hỏi</span>
                                        </div>
                                        <button className="details-button" onClick={() => { this.handleExam(exam) }}>Chi tiết</button>
                                    </div>
                                ))
                            ) : (
                                <div>Chưa có bài thi</div>
                            )}

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        selectExam: (exam) => dispatch(selectExam(exam))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryExam);
