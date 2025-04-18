import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './TTDeThi.scss';
import BinhLuan from '../../../components/BinhLuan/BinhLuan';
import CustomScrollbars from '../../../components/CustomScrollbars';
import ThongTinDeThi from '../../../components/KetQua/ThongTinDeThi';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
class TTDeThi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ({
                examId: '',
                userId: '',
            }),
            exam: '',
        };
    }

    componentDidMount = () => {
        const exam = JSON.parse(localStorage.getItem("exam"));
        this.setState({exam});
    }

    render() {
        const { exam } = this.state;

        return (
            <React.Fragment>
                {exam ? (
                    <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                        <HomeHeader />
                        <div className='container'>
                            <div className='content-top'>
                                <div className='thong-tin-de-thi'>
                                    <ThongTinDeThi />
                                </div>
                                
                            </div>
                            <div className='content-bottom'>
                                <BinhLuan />
                            </div>
                        </div>
                        <HomeFooter />
                    </CustomScrollbars>
                ) : (
                    <div>Không có dữ liệu bài thi</div>
                )}

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
        exam: state.user.selectedExam
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TTDeThi);