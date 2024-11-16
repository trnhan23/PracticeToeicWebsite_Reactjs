import './EditProfile.scss';
import { getAllUsers, editUserService } from '../../../services/userService';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';

const EditProfile = ({ toggleEditMode, userInfor }) => {
    const [email, setEmail] = useState([]);
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [info, setInfo] = useState({});

    useEffect(() => {
        const fetchAllUsers = async () => {
            if (userInfor?.id) {
                try {
                    const res = await getAllUsers(userInfor.id);
                    const info = res.users;
                    setInfo(info);
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

    const isSame = (info, updatedInfo) => {
        return JSON.stringify({
            fullName: info.fullName,
            avatar: info.avatar,
            bio: info.bio,
        }) === JSON.stringify({
            fullName: updatedInfo.fullName,
            avatar: updatedInfo.avatar,
            bio: updatedInfo.bio,
        });
    }

    const handleClick = async () => {
        try {
            const updatedInfo = {
                id: userInfor?.id,
                fullName,
                avatar,
                bio,
            };

            if (isSame(info, updatedInfo)) {
                toast.info("No changes made to the profile.");
                toggleEditMode();
                return;
            }

            const response = await editUserService(updatedInfo);
            if (response?.errCode === 0) {
                toast.success("Profile updated successfully!");
                toggleEditMode();
            } else {
                toast.error(response?.errMessage || "Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile: ", error);
            toast.error("An error occurred while updating the profile.");
        }
    };


    return (
        <div className="user-profile">
            <div className='profile-avatar'>
                <div className='img'>
                    <img
                        src={avatar ? avatar : "https://i.pravatar.cc/300?img=2"}
                        alt="Profile"
                        className="profile-image"
                    />
                    <i className="fas fa-camera"></i>
                </div>
                <div className='btn-click'>
                    <button className="edit-profile-button" onClick={handleClick}>
                        Save profile
                    </button>
                </div>
            </div>

            <div className="profile-details">
                <div className='col-12 form-group input'>
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        readOnly
                    />
                </div>
                <div className='col-12 form-group input'>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className='col-12 form-group input'>
                    <label>Bio:</label>
                    <textarea
                        type="text"
                        value={bio}
                        className="form-control"
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
