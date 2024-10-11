import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CategoryExam.scss'

class CategoryExam extends Component {
    
    render() {
        const { exams } = this.props;
        return (
            <React.Fragment>
                <div className="home-test-container">
                    <div className="toeic-test-grid">
                        {exams.map(exam => (
                            <div className="toeic-test-card" key={exam.id}>
                                <div className='card-name'>{exam.name}</div>
                                <div className="test-details">
                                    <span><i className="far fa-clock"></i> {exam.time}</span>
                                    <span><i className="far fa-user"></i> {exam.code}</span>
                                </div>
                                <div className="test-info">
                                    <span><i className="far fa-comments"></i> {exam.views}</span>
                                    <span><br/>7 phần thi | {exam.questions} câu hỏi</span>
                                </div>
                                <button className="details-button">Chi tiết</button>
                            </div>
                        ))}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryExam);
