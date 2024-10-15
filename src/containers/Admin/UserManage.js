import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService.js';

import { formatDateTime } from "../../validation/FormatDateTime.js"
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            userEdit: {}
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

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                    ><i className="fa fa-plus"></i> Add new users
                    </button>
                </div>

                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>Giới tính</th>
                                {/* <th>Ảnh đại diện</th> */}
                                <th>Tiểu sử</th>
                                <th>Ngày đăng kí</th>
                                <th>Quyền</th>
                                <th>Hành động</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.gender === true ? 'Nam' : 'Nữ'}</td>
                                            {/* <td>{item.avatar}</td> */}
                                            <td>{item.bio}</td>
                                            <td>{formatDateTime(item.registrationDate)}</td>
                                            <td>
                                                {item.roleId === 'R1' ? 'Admin' : item.roleId === 'R2' ? 'User' : ''}
                                            </td>
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
