import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService.js';
import { formatDateTime } from "../../validation/FormatDateTime.js"
import Popup from './Popup.js';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isPopupOpen: false,
            formData: {
                email: "",
                password: "",
                confirmPassword: "",
                fullName: "",
            },
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    togglePopup = () => {
        this.setState((prevState) => ({
            isPopupOpen: !prevState.isPopupOpen,
            formData: {
                email: "",
                password: "",
                confirmPassword: "",
                fullName: "",
            },
        }));
    };

    // Xử lý thay đổi trong các input
    handleInputChange = (event, field) => {
        const { formData } = this.state;
        this.setState({
            formData: {
                ...formData,
                [field]: event.target.value,
            },
        });
    };

    // Xử lý lưu dữ liệu
    handleSave = async () => {
        this.togglePopup();
        await this.getAllUserFromReact();
    };

    render() {
        let arrUsers = this.state.arrUsers;
        const { isPopupOpen, formData } = this.state;

        return (
            <div className="users-container">
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.togglePopup()}
                    ><i className="fa fa-plus"></i> Add new users
                    </button>

                    {/* Sử dụng Popup component */}
                    <Popup
                        isOpen={isPopupOpen}
                        onClose={this.togglePopup}
                        onSave={this.handleSave}
                        formData={formData}
                        onChange={this.handleInputChange}
                    />
                </div>

                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>Tiểu sử</th>
                                <th>Ngày đăng kí</th>
                                <th>Quyền</th>
                                <th>Tài khoản</th>
                                <th>Hành động</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.bio}</td>
                                            <td>{formatDateTime(item.registrationDate)}</td>
                                            <td>
                                                {item.roleId === 'R1' ? 'Admin' : item.roleId === 'R2' ? 'User' : ''}
                                            </td>
                                            <td>{item.status === true ? '✔️ Active' : '❌ Inactive'}</td>
                                            <td>
                                                <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                            </td>


                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
