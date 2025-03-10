import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/Admin/UserManage';
import TestManage from '../containers/Admin/TestManage';
<<<<<<< HEAD
=======
import TopicManage from '../containers/Admin/TopicManager'
>>>>>>> 6aee17e (Cập nhật code)
import Header from '../containers/Header/Header';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn, userInfor } = this.props;
        if (!isLoggedIn || userInfor?.roleId !== 'R1') {
            return <Redirect to="/home" />;
        }
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">

                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/test-manage" component={TestManage} />
<<<<<<< HEAD
=======
                            <Route path="/system/topic-manage" component={TopicManage} />
>>>>>>> 6aee17e (Cập nhật code)
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
