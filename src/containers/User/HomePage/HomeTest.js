import React, { Component } from 'react';
import './HomeTest.scss'
import CategoryExam from '../../../components/Category/CategoryExam';
import { get8LatestExams } from '../../../services/examService';
import { selectExam } from '../../../store/actions';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
class HomeTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryExams: [],
            loading: true,
            errMessage: ''
        };
    }
    componentDidMount = () => {
        this.handleGet8LatestExams();
    }

    handleGet8LatestExams = async () => {
        try {
            const res = await get8LatestExams();
            const cateExams = [];
            if (res && res.errCode === 0) {
                res.exams.forEach((exam) => {
                    if (exam && exam.id) {
                        cateExams.push({
                            id: exam.id,
                            titleExam: exam.titleExam,
                            stateExam: exam.stateExam,
                            countUserTest: exam.countUserTest,
                            countComment: exam.countComment,
                            statusExam: exam.userExam_ExamData?.statusExam || 0
                        });
                    }
                });
                this.setState({
                    loading: false,
                    categoryExams: cateExams,
                });
            } else {
                this.setState({
                    loading: false,
                    errMessage: res.errMessage
                });
            }
        } catch (error) {
            this.setState({
                loading: false,
                errMessage: 'Failed to fetch exams.'
            });
        }
    };
    

    handleSelectExam = (selectedExam) => {
        const updatedExam = { ...selectedExam, userId: this.props.userInfor };
        this.props.selectExam(updatedExam);
    }

    render() {
        const { categoryExams } = this.state;
        return (
            <React.Fragment>
                <div className="test-container">
                    <div className='home-test-title'>
                        Đề thi mới nhất
                    </div>
                    <div className='test'>
                        <CategoryExam exams={categoryExams}
                            onSelectExam={this.handleSelectExam} />

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeTest);
