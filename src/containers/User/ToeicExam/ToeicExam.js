import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './ToeicExam.scss';
import CategoryExamTitle from '../../../components/Category/CategoryExamTitle';
import CategoryExam from '../../../components/Category/CategoryExam';
import { getAllCategoryExams } from '../../../services/categoryExamService';
class ToeicExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryExamTitles: {},
            categoryExams: {},
            exams: {},
            loading: true,
            errMessage: ''
        };
    }

    componentDidMount = () => {
        this.handleCategoryExam();
    }

    handleCategoryTitle = (data) => {
        const uniqueIdTitles = new Set();
        const cateExamTitles = [];

        data.forEach((exam) => {
            if (!uniqueIdTitles.has(exam.id)) {
                uniqueIdTitles.add(exam.id);
                cateExamTitles.push({
                    id: exam.id,
                    titleCategoryExams: exam.titleCategoryExam
                });
            }
        });

        this.setState({
            loading: false,
            categoryExamTitles: cateExamTitles
        });

        console.log("Title exam: ", cateExamTitles)
    }

    handleCateExam = (data) => {
        const cateExams = [];
    
        data.forEach((exam) => {
            if (exam.categoryExamData && exam.categoryExamData.id) {
                cateExams.push({
                    id: exam.categoryExamData.id,
                    titleExam: exam.categoryExamData.titleExam,
                    stateExam: exam.categoryExamData.stateExam,
                    countUserTest: exam.categoryExamData.countUserTest
                });
            }
        });
    
        this.setState({
            loading: false,
            categoryExams: cateExams
        });
    
        console.log("Exams: ", cateExams);
    };
    

    handleCategoryExam = async () => {
        try {
            const res = await getAllCategoryExams('ALL');
            if (res.errCode === 0) {
                
                // lấy title
                this.handleCategoryTitle(res.cateExams);

                // lấy exams
                this.handleCateExam(res.cateExams);
            } else {
                console.error('Error fetching exams:', res);
                this.setState({
                    loading: false,
                    errMessage: res.errMessage
                });
            }
        } catch (error) {
            console.error('Error fetching exams:', error);
            this.setState({
                loading: false,
                errMessage: 'Failed to fetch exams.'
            });
        }
    }

    render() {
        const { categoryExamTitles, loading, errMessage, categoryExams } = this.state;

        // Thêm một loader hoặc thông báo khi đang tải
        if (loading) {
            return <div>Loading...</div>;
        }

        // Thông báo lỗi nếu có
        if (errMessage) {
            return <div>Error: {errMessage}</div>;
        }

        // const exams = [
        //     { id: 1, titleExam: 'Toeic Test 1', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 2, titleExam: 'Toeic Test 2', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 3, titleExam: 'Toeic Test 3', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 4, titleExam: 'Toeic Test 4', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 5, titleExam: 'Toeic Test 5', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 6, titleExam: 'Toeic Test 6', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 7, titleExam: 'Toeic Test 7', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 8, titleExam: 'Toeic Test 8', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 9, titleExam: 'Toeic Test 1', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 10, titleExam: 'Toeic Test 2', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 11, titleExam: 'Toeic Test 3', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 12, titleExam: 'Toeic Test 4', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 13, titleExam: 'Toeic Test 5', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 14, titleExam: 'Toeic Test 6', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 15, titleExam: 'Toeic Test 7', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 16, titleExam: 'Toeic Test 8', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        //     { id: 17, titleExam: 'Toeic Test 8', time: '120 phút', countUserTest: '555555', views: 784, questions: 200 },
        // ];

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='toeic-exam-container'>
                        <div className='toeic-exam-content'>
                            <div className='toeic-exam-title'>Thư viện đề thi Toeic</div>

                            <div className='toeic-category-exam-title'>
                                <CategoryExamTitle categories={categoryExamTitles} />
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
                                <CategoryExam exams={categoryExams} />
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
