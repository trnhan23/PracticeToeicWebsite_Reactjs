import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import '@fortawesome/fontawesome-free/css/all.min.css';

import CustomScrollbars from '../../components/CustomScrollbars';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import * as actions from "../../store/actions";
import './Register.scss';
import { SIGNUP } from '../../utils';
import { createNewUserService } from '../../services/userService';
import { validateAlphabetic, validateEmail } from '../../validation/Validated'
import ToastUtil from '../../utils/ToastUtil';
import _ from 'lodash';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            isShowConfirmPassword: false,
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errMessage: '',
        }
    }

    handleOnChangeFullname = (event) => {
        const value = event.target.value;

        if (validateAlphabetic(value)) {
            this.setState({
                errMessage: '',
                fullName: value
            });
        } else {
            this.setState({
                errMessage: "Chỉ nhập kí tự chữ"
            });
        }
    }

    handleOnChangeEmail = (event) => {
        const email = event.target.value;
        this.setState({
            email: email
        });
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    hanldeShowHidePassword = (data) => {
        if (data === SIGNUP.PW) {
            this.setState({
                isShowPassword: !this.state.isShowPassword
            })
        }
        else {
            this.setState({
                isShowConfirmPassword: !this.state.isShowConfirmPassword
            })
        }
    }

    checkNull = () => {
        let fullName = this.state.fullName;
        let email = this.state.email;
        let password = this.state.password;
        let confPass = this.confirmPassword;
        if (fullName === '' || email === '' || password === '' || confPass === '')
            return false;
        return true;
    }

    checkEmail = () => {
        let email = this.state.email;
        if (validateEmail(email) || email === '') {
            this.setState({
                errMessage: ''
            });
        } else {
            this.setState({
                errMessage: "Email không hợp lệ"
            });
        }
    }

    handleRegisterUser = async () => {
        this.setState({ errMessage: '' });
        try {
            //kiểm tra các trường rỗng
            if (!this.checkNull()) {
                this.setState({
                    errMessage: "Nhập đầy đủ thông tin"
                });
                return;
            }

            //kiểm tra pass với confirmpass có giống nhau không
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({
                    errMessage: "Mật khẩu không trùng khớp"
                });
                return;
            }

            let data = await createNewUserService({
                fullName: this.state.fullName,
                email: this.state.email,
                password: this.state.password
            });
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                });
                ToastUtil.error("Registration Failed", data.errMessage);
                this.setState({
                    errMessage: data.errMessage
                });
            }
            if (data && data.errCode === 0) {
                this.props.navigate('/login');
            }
        } catch (error) {
            if (error.response) {

                const errMessage = error.response.data.message;
                this.setState({ errMessage });
            }
            console.log('Error', error.response || error);
        }
    }

    render() {
        const { showToast, errMessage, time } = this.state;
        return (
            <Fragment>
                <HomeHeader></HomeHeader>
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                    <div className='register-container'>
                        <div className='register-background'>
                            <div className='register-content'>
                                <div className='form-content'>
                                    <div className='content-image'></div>

                                    <div className='content-text'>
                                        <div className='child-text1'>
                                            Chào mừng bạn đến với SkillUp Toeic!
                                        </div>
                                        <div className='child-text2'>
                                            Trang web luyện thi TOEIC toàn diện, nơi bạn có thể cải thiện kỹ năng Nghe và Đọc, sẵn sàng chinh phục kỳ thi TOEIC với các bài học và bài kiểm tra đa dạng.
                                        </div>
                                        <div className='child-text3'>
                                            Hãy bắt đầu hành trình học tập của bạn ngay hôm nay và đạt được số điểm mong muốn!
                                        </div>
                                    </div>
                                </div>

                                <div className='sign-up'>
                                    <div className='col-12 text-sign-up'>SIGN UP</div>
                                    <div className='col-12 form-group sign-up-input' >

                                        <label>Full Name</label>
                                        <input
                                            className='form-control'
                                            placeholder='Enter your full name'
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnChangeFullname(event)}
                                            type='text'
                                        >
                                        </input>
                                    </div>
                                    <div className='col-12 form-group sign-up-input' >
                                        <label>Email</label>
                                        <input
                                            className='form-control'
                                            placeholder='Enter your email'
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnChangeEmail(event)}
                                            onBlur={() => { this.checkEmail() }}
                                            type='email'
                                        >
                                        </input>
                                    </div>
                                    <div className='col-12 form-group sign-up-input' >
                                        <label>Password</label>
                                        <div className='custom-input-password'>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your password'
                                                value={this.state.password}
                                                onChange={(event) => this.handleOnChangePassword(event)}
                                                type={this.state.isShowPassword ? "text" : 'password'}
                                            >
                                            </input>
                                            <span onClick={() => { this.hanldeShowHidePassword(SIGNUP.PW) }}>
                                                <i className={this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className='col-12 form-group sign-up-input' >
                                        <label>Confirm Password</label>
                                        <div className='custom-confirm-password'>
                                            <input
                                                className='form-control'
                                                placeholder='Enter your confirm password'
                                                value={this.state.confirmPassword}
                                                onChange={(event) => this.handleOnChangeConfirmPassword(event)}
                                                type={this.state.isShowConfirmPassword ? "text" : 'password'}
                                            >
                                            </input>
                                            <span onClick={() => { this.hanldeShowHidePassword(SIGNUP.CP) }}>
                                                <i className={this.state.isShowConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                            </span>
                                        </div>

                                    </div>
                                    <div className='col-12' style={{ color: 'red' }}>
                                        {this.state.errMessage}
                                    </div>
                                    <div className='col-12' >
                                        <button
                                            className='btn-sign-up'
                                            onClick={() => { this.handleRegisterUser() }}>
                                            Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <HomeFooter></HomeFooter>
                </CustomScrollbars>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
