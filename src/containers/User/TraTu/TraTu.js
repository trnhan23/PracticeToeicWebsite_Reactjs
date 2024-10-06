import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import * as actions from "../../../store/actions";
import { push } from "connected-react-router";
import './TraTu.scss'
class TraTu extends Component {

    render() {
        return (
            <div>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='tra-tu-container'>Tra từ</div>
                    <HomeFooter />
                </CustomScrollbars>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TraTu);
