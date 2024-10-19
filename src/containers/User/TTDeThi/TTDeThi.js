import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './TTDeThi.scss'
import KetQuaLamBai from '../../../components/KetQua/KetQuaLamBai';
import PhanThi from '../../../components/KetQua/PhanThi';
import BinhLuan from '../../../components/BinhLuan/BinhLuan';
import CustomScrollbars from '../../../components/CustomScrollbars';
import ThongTinDeThi from '../../../components/KetQua/ThongTinDeThi';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
class TTDeThi extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='container'>
                        <div className='content-top'>
                            <div className='thong-tin-de-thi'>
                                <ThongTinDeThi />
                            </div>

                            <div className='ket-qua-lam-bai'>
                                <KetQuaLamBai />
                            </div>

                            <div className='phan-thi'>
                                <PhanThi />
                            </div>
                        </div>
                        <div className='content-bottom'>
                            <BinhLuan />
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

export default connect(mapStateToProps, mapDispatchToProps)(TTDeThi);
