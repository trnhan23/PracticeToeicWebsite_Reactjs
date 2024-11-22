import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import TestResult from '../../../components/KetQua/TestResult';
import { getInfoStatistic } from '../../../services/testService';
import { formatTime, convertSecondsToMinutes } from '../../../validation/FormatTime';
import './Statistic.scss';

class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            activeTab: 'listening',
            // pieChartData: {
            //     labels: ['Listening', 'Reading'],
            //     datasets: [
            //         {
            //             data: [310, 250], // Dữ liệu điểm trung bình của từng phần
            //             backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            //             borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
            //             borderWidth: 1,
            //         }
            //     ]
            // },
            chartData: {},
            info: {
                countExamTested: '',
                avgTime: '',
                sumTime: '',
                maxListenAnswer: '',
                maxReadAnswer: '',
                accuracy: '',
                averageListenScore: '',
                averageReadScore: '',
            }
        };
    }

    componentDidMount = () => {
        this.fetchGetInfoStatistic();
    }

    fetchGetInfoStatistic = async () => {
        const userData = localStorage.getItem("persist:user");
        if (userData) {
            const parsedData = JSON.parse(userData);
            const userInfo = JSON.parse(parsedData.userInfor);
            const res = await getInfoStatistic(userInfo.id);

            if (res.errCode === 0) {
                console.log("Kiểm tra res: ", res);
                this.setState({
                    info: res.info,
                    chartData: {
                        labels: res.info.scoreByDate.listen.labels,
                        datasets: [
                            {
                                label: 'Listening Score',
                                data: res.info.scoreByDate.listen.data,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 2,
                                fill: true,
                                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                                pointBorderColor: '#fff',
                                pointRadius: 5,
                            }
                        ],
                    },
                }, () => {
                })
            }
        }

    }

    handleTabClick = (tab) => {
        this.setState({
            activeTab: tab
        }, () => {
            if (this.state.activeTab === 'listening') {
                this.setState({
                    chartData: {
                        labels: this.state.info.scoreByDate.listen.labels,
                        datasets: [
                            {
                                label: 'Listening Score',
                                data: this.state.info.scoreByDate.listen.data,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                borderWidth: 2,
                                fill: true,
                                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                                pointBorderColor: '#fff',
                                pointRadius: 5,
                            }
                        ],
                    },
                }, () => {
                })
            } else {
                this.setState({
                    chartData: {
                        labels: this.state.info.scoreByDate.read.labels,
                        datasets: [
                            {
                                label: 'Reading Score',
                                data: this.state.info.scoreByDate.read.data,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 2,
                                fill: true,
                                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                                pointBorderColor: '#fff',
                                pointRadius: 5,
                            }
                        ],
                    },
                }, () => {
                })
            }
        });
    }

    render() {
        const { activeTab, info } = this.state;

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
                                    <div className='number'>{info.countExamTested}</div>
                                    <div className='unit'>đề thi</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='icon'><i className="far fa-clock"></i></div>
                                    <div className='cont'>Thời gian luyện thi</div>
                                    <div className='number'>{convertSecondsToMinutes(info.sumTime)}</div>
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
                                    <div className='number'>{info.countExamTested}</div>
                                    <div className='unit'>đề thi</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Độ chính xác</div>
                                    <div className='cont'>(#đúng/#tổng)</div>
                                    <div className='number'>{info.accuracy * 100}%</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Thời gian trung bình</div>
                                    <div className='number'>{formatTime(info.avgTime)}</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Điểm trung bình</div>
                                    <div className='number'>{activeTab === 'listening' ? info.averageListenScore : info.averageReadScore}/495</div>
                                </div>
                                <div className='nav-bar'>
                                    <div className='cont'>Điểm cao nhất</div>
                                    <div className='number'>{activeTab === 'listening' ? info.maxListenAnswer : info.maxReadAnswer}/495</div>
                                </div>
                            </div>

                        </div>

                        <div className='statistic-chart'>
                            <div className='line-chart'>
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
                            {/* <div className='pie-chart'>
                                <h3>Tỉ lệ điểm từng phần</h3>
                                <Line
                                    data={this.state.pieChartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: 'right',
                                                labels: {
                                                    usePointStyle: true,
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div> */}
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
