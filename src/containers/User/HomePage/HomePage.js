import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeCenter from './HomeCenter';
import HomeFooter from './HomeFooter';
import HomeTest from './HomeTest';
import CustomScrollbars from '../../../components/CustomScrollbars';

class HomePage extends Component {

    render() {


        return (
            <div>
                {/* <HomeHeader></HomeHeader> */}
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader></HomeHeader>
                    <HomeCenter></HomeCenter>
                    <HomeTest></HomeTest>
                    <HomeFooter></HomeFooter>
                </CustomScrollbars>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
