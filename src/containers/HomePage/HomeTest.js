import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeTest.scss'

class HomeTest extends Component {
    
    render() {
        const tests = [
            { id: 1, name: 'Toeic Test 1', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 2, name: 'Toeic Test 2', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 3, name: 'Toeic Test 3', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 4, name: 'Toeic Test 4', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 5, name: 'Toeic Test 5', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 6, name: 'Toeic Test 6', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 7, name: 'Toeic Test 7', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 8, name: 'Toeic Test 8', time: '120 phút', code: '555555', views: 784, questions: 200 },
        ];
        return (
            <React.Fragment>
                <div className="home-test-container">
                    <div className='title-test'>Đề thi mới nhất</div>
                    <div className="toeic-test-grid">
                        {tests.map(test => (
                            <div className="toeic-test-card" key={test.id}>
                                <div className='card-name'>{test.name}</div>
                                <div className="test-details">
                                    <span><i class="far fa-clock"></i> {test.time}</span>
                                    <span><i class="far fa-user"></i> {test.code}</span>
                                </div>
                                <div className="test-info">
                                    <span><i class="far fa-comments"></i> {test.views}</span>
                                    <span><br/>7 phần thi | {test.questions} câu hỏi</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeTest);
