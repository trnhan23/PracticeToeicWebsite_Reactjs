import React from 'react';
import './EditProfile.scss';

const EditProfile = ({ toggleEditMode }) => {
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
                        Save profile
                    </button>
                </div>
            </div>

            <div className="profile-details">
                <div className='col-12 form-group input' >
                    <label>Email:</label>
                    <input
                        type='email'
                        className={`form-control`}
                        readOnly={true}>
                    </input>
                </div>
                <div className='col-12 form-group input' >
                    <label>Full Name:</label>
                    <input
                        type='text'
                        className={`form-control`}>
                    </input>
                </div>
                <div className='col-12 form-group input' >
                    <label>Bio:</label>
                    <textarea
                        type='text'
                        className={`form-control`}>
                    </textarea>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
