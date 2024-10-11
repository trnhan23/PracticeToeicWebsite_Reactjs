import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './ToeicExam.scss';
import CategoryExamTitle from '../../../components/Category/CategoryExamTitle';
import CategoryExam from '../../../components/Category/CategoryExam';
class ToeicExam extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const categories = [
            { id: 1, title: '2024' },
            { id: 2, title: '2023' },
            { id: 3, title: '2022' },
            { id: 4, title: '2021' },
            { id: 5, title: '2020' },
            { id: 6, title: '2019' },
            { id: 7, title: '2018' },
            { id: 8, title: 'New Economy' },
            { id: 9, title: 'ETS (old format)' }
        ];

        const exams = [
            { id: 1, name: 'Toeic Test 1', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 2, name: 'Toeic Test 2', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 3, name: 'Toeic Test 3', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 4, name: 'Toeic Test 4', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 5, name: 'Toeic Test 5', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 6, name: 'Toeic Test 6', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 7, name: 'Toeic Test 7', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 8, name: 'Toeic Test 8', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 9, name: 'Toeic Test 1', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 10, name: 'Toeic Test 2', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 11, name: 'Toeic Test 3', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 12, name: 'Toeic Test 4', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 13, name: 'Toeic Test 5', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 14, name: 'Toeic Test 6', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 15, name: 'Toeic Test 7', time: '120 phút', code: '555555', views: 784, questions: 200 },
            { id: 16, name: 'Toeic Test 8', time: '120 phút', code: '555555', views: 784, questions: 200 },
        ];

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='toeic-exam-container'>
                        <div className='toeic-exam-content'>
                            <div className='toeic-exam-title'>Thư viện đề thi Toeic</div>

                            <div className='toeic-category-exam-title'>
                                <CategoryExamTitle categories={categories} />
                            </div>

                            <div className='toeic-exam-search'>
                                <input
                                    className='toeic-exam-search-input'
                                    type='text'
                                    placeholder='Nhập từ khóa bạn muốn tìm kiếm'
                                />
                                <button className='toeic-exam-search-button'>Tìm kiếm</button>
                            </div>

                            <div className='toeic-exam'>
                                <CategoryExam exams={exams}/>
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
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToeicExam);
