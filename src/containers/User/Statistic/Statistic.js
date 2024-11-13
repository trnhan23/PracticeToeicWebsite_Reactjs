import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import TestResult from '../../../components/KetQua/TestResult';
import './Statistic.scss';

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        return (
            <React.Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <div className='statistic-container'>
                        <div className='statistic-title'>Thống kê kết quả luyện thi</div>
                        <div className='statistic-content-top'>
                            <div className='scrpit'>Lọc kết quả theo ngày (Tính từ bài thi cuối)</div>
                            <div className="filter-section">
                                <select>
                                    <option value="30">30 ngày</option>
                                    <option value="7">7 ngày</option>
                                </select>
                                <button className='btn-search'>Search</button>
                                <button className='btn-clear'>Clear</button>
                            </div>
                        </div>
                        <div className='statistic-content-center'>
                            <div className='nav'>
                                <div className='nav-bar'>
                                    <div className='icon'><i className="fas fa-book-open"></i></div>
                                    <div className='cont'>Số đề đã làm</div>
                                    <div className='number'>26</div>
                                    <div className='unit'>đề thi</div>
                                </div>

                                <div className='nav-bar'>
                                    <div className='icon'><i className="far fa-clock"></i></div>
                                    <div className='cont'>Thời gian luyện thi</div>
                                    <div className='number'>3743</div>
                                    <div className='unit'>phút</div>
                                </div>
                            </div>

                        </div>
                        <div className='test-result'>
                            <TestResult />
                        </div>

                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
