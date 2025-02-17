import './EditProfile.scss';
import { getAllUsers, editUserService } from '../../../services/userService';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';
import CropImagePopup from './CropImagePopup';
import { uploadFile } from '../../../services/uploadService';


const EditProfile = ({ toggleEditMode, userInfor }) => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [info, setInfo] = useState({});
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isCropPopupVisible, setIsCropPopupVisible] = useState(false);
    const [fileUrl, setFileUrl] = useState('');

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
    };

    const base64ToFile = (base64, fileName = 'file.jpg') => {
        const [header, data] = base64.split(',');
        const byteCharacters = atob(data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset++) {
            byteArrays.push(byteCharacters.charCodeAt(offset));
        }
        const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpeg' });
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        return file;
    }

    const uploadAvatar = async (image) => {
        try {
            let fileOld = image;
            let fileNew = base64ToFile(fileOld);
            let formData = new FormData();
            formData.append('file', fileNew);
            let res = await uploadFile(formData);
            if(res){
                return res.fileUrl;
            }
            toast.error("An error occurred while uploading the avatar.");
            return;
        } catch (error) {
            console.error("Error uploading avatar: ", error);
            toast.error("An error occurred while uploading the avatar.");
            return;
        }
    };

    const handleClick = async () => {
        try {
            let finalAvatar = avatar;
            let fileUrl = '';
            if (finalAvatar) {
                const uploadedUrl = await uploadAvatar(finalAvatar);
                if (uploadedUrl) {
                    fileUrl = uploadedUrl;
                } else {
                    return;
                }
            }
            // Chuẩn bị dữ liệu cập nhật
            const updatedInfo = {
                id: userInfor?.id,
                fullName,
                avatar: fileUrl,
                bio,
            };

            // Kiểm tra xem dữ liệu có thay đổi không
            if (isSame(info, updatedInfo)) {
                toggleEditMode();
                return;
            }

            // Gửi dữ liệu cập nhật lên server
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


    const handleChooseAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedAvatar(reader.result);
                setIsCropPopupVisible(false);
                setTimeout(() => setIsCropPopupVisible(true), 0);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClosePopup = () => {
        setIsCropPopupVisible(false);
        setSelectedAvatar(null);
    };

    const handleCrop = (croppedImage) => {
        setAvatar(croppedImage);
    };

    return (
        <div className="user-profile">
            <div className='profile-avatar'>
                <div className='img'>
                    <img
                        src={avatar || "https://i.pravatar.cc/300?img=2"}
                        alt="Profile"
                        className="profile-image"
                    />
                    <input
                        type="file"
                        id="avatarInput"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleChooseAvatar}
                    />
                    <i className="fas fa-camera" onClick={() => document.getElementById('avatarInput').click()}></i>
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

            {isCropPopupVisible && (
                <CropImagePopup
                    image={selectedAvatar}
                    onCrop={handleCrop}
                    onClose={handleClosePopup}
                />
            )}
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
