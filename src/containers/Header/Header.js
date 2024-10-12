import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';

import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkRoleAdmin: false
        }
    }


    componentDidMount() {
        // const { userInfor } = this.props;
        // if(userInfor && !_.isEmpty(userInfor)){
        //     let role = userInfor.roleId;
        //     if(role === ROLE.Admin){
        //         this.setState({
        //             checkRoleAdmin: true
        //         })
        //     }
        // }
    }

    render() {
        const { processLogout, userInfor } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className='header-right'>
                    <div className='welcome'>
                        Welcome, {userInfor && userInfor.fullName ? userInfor.fullName : ''}!
                    </div>
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
