import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './ToeicExam.scss';
import CategoryExamTitle from '../../../components/Category/CategoryExamTitle';
import CategoryExam from '../../../components/Category/CategoryExam';
import Loading from '../../../components/Loading/Loading';
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
            return <div><Loading /></div>;
        }
        // Thông báo lỗi nếu có
        if (errMessage) {
            return <div>Error: {errMessage}</div>;
        }

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
