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
import Pagination from '../../../components/Pagination/Pagination';
import { getAllCategoryExams } from '../../../services/categoryExamService';
import { getAllExams } from '../../../services/examService';
import { selectExam } from '../../../store/actions';

class ToeicExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryExamTitles: [],
            categoryExams: [],
            exams: [],
            selectedTitleId: '',
            selectedExam: [],
            searchExam: '',
            loading: true,
            currentPage: 1,
            totalPages: 0,
            numberOfElementPerPAge: 8,
            errMessage: ''
        };
    }

    componentDidMount = () => {
        this.handleCategoryExam();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedTitleId !== this.state.selectedTitleId) {
            this.handleCateExam();
            this.clearSearch();
        }
    }

    handleOnChangeSearch = (event) => {
        this.setState({ searchExam: event.target.value });
    }

    clearSearch = () => {
        this.setState({ searchExam: '' });
    }

    // hàm tìm kiếm exam theo tên exam
    filterExams = () => {
        const { searchExam, categoryExams } = this.state;
        return categoryExams.filter(exam =>
            exam.titleExam.toLowerCase().includes(searchExam.toLowerCase())
        );
    }

    // hàm lấy các danh sách category exam
    handleCategoryTitle = async () => {
        const res = await getAllCategoryExams('ALL');
        if (res.errCode === 0) {
            const uniqueIdTitles = new Set();
            const cateExamTitles = [];

            res.cateExams.forEach((exam) => {
                if (!uniqueIdTitles.has(exam.id)) {
                    uniqueIdTitles.add(exam.id);
                    cateExamTitles.push({
                        id: exam.id,
                        titleCategoryExams: exam.titleCategoryExam
                    });
                }
            });

            const firstId = [...uniqueIdTitles][0];

            this.setState({
                loading: false,
                selectedTitleId: firstId,
                categoryExamTitles: cateExamTitles
            });

        } else {
            console.error('Error handleCategoryTitle:', res);
            this.setState({
                loading: false,
                errMessage: res.errMessage
            });
        }
    }

    // hàm lấy các exam theo category_exam
    handleCateExam = async (page = 1) => {
        try {
            this.setState({ loading: true });
            const res = await getAllExams(this.state.selectedTitleId, this.props.userInfor.id, page);
            const cateExams = [];

            if (res.errCode === 0) {
                res.exams.exams.forEach((exam) => {
                    if (exam && exam.id) {

                        const userExam_ExamData = exam.userExam_ExamData;
                        const statusExam = Array.isArray(userExam_ExamData) && userExam_ExamData.length > 0
                            ? userExam_ExamData[0].statusExam
                            : false;

                        cateExams.push({
                            id: exam.id,
                            titleExam: exam.titleExam,
                            statusExam: statusExam,
                            countUserTest: exam.countUserTest,
                            countComment: exam.countComment
                        });
                    }
                });

                this.setState({
                    loading: false,
                    categoryExams: cateExams,
                    currentPage: page,
                    totalPages: Math.ceil(res.exams.totalCount / this.state.numberOfElementPerPAge),
                    searchExam: '',
                });
            } else {
                console.error('Error handleCateExam:', res);
                this.setState({
                    loading: false,
                    errMessage: res.errMessage
                });
            }
        } catch (error) {
            console.error('Error handleCateExam:', error);
            this.setState({
                loading: false,
                errMessage: 'Failed to fetch exams.'
            });
        }
    };

    // Hàm xử lý khi chuyển trang
    handlePageChange = (newPage) => {
        this.handleCateExam(newPage);
    }

    // hàm lấy các exam theo id của category exam và lấy tất cả các category exam
    handleCategoryExam = async () => {
        try {
            await this.handleCategoryTitle();
            await this.handleCateExam();
        } catch (error) {
            console.error('Error fetching exams:', error);
            this.setState({
                loading: false,
                errMessage: 'Failed to fetch exams.'
            });
        }
    }

    // hàm lấy id của category exam khi click vào
    handleSelectCategoryTitle = (id) => {
        this.setState({
            selectedTitleId: id,
        });
    };

    // hàm lấy đề thi (exam) từ category exam
    handleSelectExam = (selectedExam) => {
        console.log("Click");
        const updatedExam = { ...selectedExam, userId: this.props.userInfor };
        this.props.selectExam(updatedExam);
    }


    render() {
        const { categoryExamTitles, loading, errMessage, selectedTitleId, currentPage, totalPages } = this.state;

        // hàm xử lý tìm kiếm exam
        const filteredExams = this.filterExams();

        // loading dữ liệu
        if (loading) {
            return <div><Loading /></div>;
        }
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
                                <CategoryExamTitle
                                    categories={categoryExamTitles}
                                    selectedTitleId={selectedTitleId}
                                    onSelectCategory={this.handleSelectCategoryTitle}
                                />
                            </div>

                            <div className='toeic-exam-search'>
                                <input
                                    className='toeic-exam-search-input'
                                    type='text'
                                    placeholder='Nhập từ khóa bạn muốn tìm kiếm'
                                    value={this.state.searchExam}
                                    onChange={(event) => { this.handleOnChangeSearch(event) }}
                                />
                                <button className='toeic-exam-search-button'>Tìm kiếm</button>
                            </div>

                            <div className='toeic-exam'>
                                <CategoryExam
                                    exams={filteredExams}
                                    onSelectExam={this.handleSelectExam} />
                            </div>

                            <div className='toeic-pagination'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={this.handlePageChange}
                                />
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
        selectExam: (exam) => dispatch(selectExam(exam))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToeicExam);

