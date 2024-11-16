import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import './Profile.scss';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import TestResult from '../../../components/KetQua/TestResult';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };
    }

    toggleEditMode = () => {
        this.setState((prevState) => ({
            isEditing: !prevState.isEditing,
        }));
    };

    render() {
        return (
            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                <HomeHeader />
                <div className="profile-container">
                    <div className='profile-title'>
                        Thông tin cá nhân
                    </div>
                    <div className='profile-banner'></div>
                    <div className='user-profile'>
                        {/* Toggle between UserProfile and EditProfile */}
                        {this.state.isEditing ? (
                            <EditProfile toggleEditMode={this.toggleEditMode} />
                        ) : (
                            <UserProfile toggleEditMode={this.toggleEditMode} />
                        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
