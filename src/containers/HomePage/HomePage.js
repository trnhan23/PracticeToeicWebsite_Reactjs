import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeCenter from './HomeCenter';
import HomeFooter from './HomeFooter';
class HomePage extends Component {

    render() {


        return (
            <div>
                <HomeHeader></HomeHeader>
                {/* <HomeHeader></HomeHeader>
                <HomeCenter></HomeCenter>
                <HomeFooter></HomeFooter> */}
                <div>
                HomePage
                </div>
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
