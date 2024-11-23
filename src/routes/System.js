import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/Admin/UserManage';
import UserRedux from '../containers/Admin/UserRedux';
import TestManage from '../containers/Admin/TestManage';
import VocabularyManage from '../containers/Admin/VocabularyManage';
import BlogManage from '../containers/Admin/BlogManage';
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
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/test-manage" component={TestManage} />
                            <Route path="/system/vocabulary-manage" component={VocabularyManage} />
                            <Route path="/system/blog-manage" component={BlogManage} />
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
