import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './ResultPractice.scss';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import TestResult from '../../../components/KetQua/TestResult';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { path } from '../../../utils';
class ResultPractice extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    handleStatistic = () => {
        this.props.navigate(path.STATISTIC);
    }

    render() {
        return (
            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                <HomeHeader />
                <div className="lam-bai-container">
                    <div className='title'>Kết quả luyện thi</div>
                    <div className='btn-statistic'>
                        <button className='btn' onClick={() => {this.handleStatistic()}}>
                            <i className="far fa-chart-bar"></i>
                            Tới trang thống kê kết quả luyện thi</button>
                    </div>
                    <div className='test-result'>
                        <TestResult />
                    </div>
                </div>
                <HomeFooter />
            </CustomScrollbars>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfor: state.user.userInfor,
    exam: state.user.selectedExam,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultPractice);
