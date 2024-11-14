import React from 'react';
import './UserProfile.scss';

const UserProfile = ({ toggleEditMode }) => {
    return (
        <div className="user-profile">
            <div className='profile-avatar'>
                <div className='img'>
                    <img
                        src="https://i.pravatar.cc/300?img=2"
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
                <div className='btn-click'>
                    <button className="edit-profile-button" onClick={toggleEditMode}>
                        Edit profile
                    </button>
                </div>
            </div>

            <div className="profile-details">
                <div className='profile-name'>Trọng Nhân</div>
                <div className='profile-email'>Email: phamtrongnhan6523@gmail.com</div>
                <div className='profile-bio'>Đây là bio của tôi.</div>
            </div>
        </div>
    );
};

export default UserProfile;
