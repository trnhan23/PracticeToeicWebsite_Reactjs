import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
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
            activeTab: 'listening',
            chartData: {
                labels: [
                    '2024-08-15', '2024-08-16', '2024-08-17', '2024-08-18', '2024-08-19',
                    '2024-08-20', '2024-08-21', '2024-08-22', '2024-08-23', '2024-08-24',
                    '2024-08-25', '2024-08-26', '2024-08-27', '2024-08-28', '2024-08-29',
                    '2024-08-30', '2024-08-31', '2024-09-01', '2024-09-02', '2024-09-03',
                    '2024-09-04', '2024-09-05', '2024-09-06', '2024-09-07'
                ],
                datasets: [
                    {
                        label: '%Correct (30D)',
                        data: [
                            57.66, 64.00, 57.00, 53.67, 57.00, 60.67, 63.33, 57.50, 65.00, 60.36,
                            60.00, 64.52, 59.00, 63.00, 65.00, 64.62, 55.00, 61.82, 70.00, 68.00,
                            64.00, 70.00, 74.36, 79.00
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: true,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointRadius: 5,
                    }
                ]
            }
        };
    }

    handleTabClick = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { activeTab } = this.state;

        return (
            <React.Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
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

                            <div className='btn-listen-read'>
                                <button
                                    className={`btn-listen ${activeTab === 'listening' ? 'active' : ''}`}
                                    onClick={() => this.handleTabClick('listening')}
                                >
                                    Listening
                                </button>
                                <button
                                    className={`btn-read ${activeTab === 'reading' ? 'active' : ''}`}
                                    onClick={() => this.handleTabClick('reading')}
                                >
                                    Reading
                                </button>
                            </div>

                            <div className='info'>
                                <div className='nav-bar'>
                                    <div className='cont'>Số đề đã làm</div>
                                    <div className='number'>26</div>
                                    <div className='unit'>đề thi</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Độ chính xác</div>
                                    <div className='cont'>(#đúng/#tổng)</div>
                                    <div className='number'>61.29%</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Thời gian trung bình</div>
                                    <div className='number'>1:23:13</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Điểm trung bình</div>
                                    <div className='number'>310/495</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Điểm cao nhất</div>
                                    <div className='number'>410/495</div>
                                </div>
                            </div>

                        </div>

                        <div className='statistic-chart'>
                            <Line
                                data={this.state.chartData}
                                options={{
                                    responsive: true,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            max: 100,
                                            title: {
                                                display: true,
                                                text: '% Correct'
                                            }
                                        },
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Date'
                                            }
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: 'top',
                                            labels: {
                                                usePointStyle: true,
                                                color: 'rgba(255, 99, 132, 1)'
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>

                        <div className='test-result'>
                            <div className='test-result-title'>
                                Danh sách đề thi đã làm:
                            </div>
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
