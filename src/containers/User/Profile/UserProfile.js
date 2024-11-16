import React, { useState, useEffect } from 'react';
import './UserProfile.scss';
import { getAllUsers } from '../../../services/userService';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

const UserProfile = ({ toggleEditMode, userInfor }) => {
    const [email, setEmail] = useState([]);
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchAllUsers = async () => {
            if (userInfor?.id) {
                try {
                    const res = await getAllUsers(userInfor.id);
                    const info = res.users;
                    setEmail(info.email);
                    setFullName(info.fullName);
                    setAvatar(info.avatar);
                    setBio(info.bio);
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            }
        };

        fetchAllUsers();
    }, [userInfor]);

    return (
        <div className="user-profile">
            <div className="profile-avatar">
                <div className="img">
                    <img
                        src={avatar ? avatar : "https://i.pravatar.cc/300?img=2"}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
                <div className="btn-click">
                    <button className="edit-profile-button" onClick={toggleEditMode}>
                        Edit profile
                    </button>
                </div>
            </div>

            <div className="profile-details">
                <div className="profile-name">{fullName}</div>
                <div className="profile-email">Email: {email}</div>
                <div className="profile-bio">{bio}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfor: state.user.userInfor,
    exam: state.user.selectedExam,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
