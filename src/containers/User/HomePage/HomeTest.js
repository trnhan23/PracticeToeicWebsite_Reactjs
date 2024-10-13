import React, { Component } from 'react';
import './HomeTest.scss'
import CategoryExam from '../../../components/Category/CategoryExam';
import { get8LatestExams } from '../../../services/examService';
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
                            countUserTest: exam.countUserTest
                        });
                    }
                });
                this.setState({
                    loading: false,
                    categoryExams: cateExams,
                });
            } else {
                console.error('Error handleGet8LatestExams:', res);
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
        const {categoryExams} = this.state;
        return (
            <React.Fragment>
                <div className="home-test-container">
                    <CategoryExam exams={categoryExams} />
                </div>
            </React.Fragment>
        );
    }

}

export default HomeTest;
