import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadFile from '../../components/UploadAndViewFile/UploadFile';
import { getAllCategoryExams } from '../../services/categoryExamService';
import CustomScrollbars from '../../components/CustomScrollbars';
import Loading from '../../components/Loading/Loading';
import './TestManage.scss';
class TestManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            selectedExamId: '',
            titleExam: '',
            examId: '',
            loading: true,
        }
    }

    componentDidMount() {
        this.fetchExams();
    }



    fetchExams = async () => {
        try {
            const res = await getAllCategoryExams('ALL');
            this.setState({
                exams: res.cateExams,
                loading: false,
            }, () => {
                this.setState({
                    selectedExamId: this.state.exams[0].id,
                })
            })

        } catch (error) {
            console.error("Error fetching exams: ", error);
        }
    }

    handleDropdownChange = (event) => {
        const examId = parseInt(event.target.value, 10);
        this.setState({ selectedExamId: examId });
    };

    handleOnChange = (event) => {
        this.setState({
            titleExam: event.target.value
        })
    }

    render() {
        const { selectedExamId, loading, titleExam } = this.state;
        const { userInfor } = this.props;

        if (loading) {
            return <div><Loading /></div>;
        }
        return (

            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>

                <div className='user-redux-container'>
                    <div className='title'>
                        QUẢN LÝ BÀI THI
                    </div>

                    <div className='exam-name-input'>
                        <div className='exam-dropdown'>
                            <label className='dropdown-name'>Chọn danh mục đề thi</label>
                            <select
                                id="examDropdown"
                                value={selectedExamId}
                                onChange={this.handleDropdownChange}
                            >
                                {this.state.exams.map((exam) => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.titleCategoryExam}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='exam-input'>
                            <label className='name'>Nhập tên đề thi</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Nhập tên bài thi'
                                value={this.state.titleExam}
                                onChange={(event) => { this.handleOnChange(event) }}>
                            </input>
                        </div>
                    </div>
                    <div className='user-redux-body'>
                        <UploadFile
                            selectedExamId={selectedExamId}
                            titleExam={titleExam}
                            userInfor={userInfor}
                        />
                    </div>
                </div>
            </CustomScrollbars>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestManage);
