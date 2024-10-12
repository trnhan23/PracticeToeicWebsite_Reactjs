import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import '@fortawesome/fontawesome-free/css/all.min.css';

import CustomScrollbars from '../../components/CustomScrollbars';
import HomeHeader from '../User/HomePage/HomeHeader';
import HomeFooter from '../User/HomePage/HomeFooter';
import './Register.scss';
import { ROLE, SIGNUP } from '../../utils';
import { createNewUserService } from '../../services/userService';
import { validateAlphabetic, validateEmail, validatePassword } from '../../validation/Validated'

import { path } from '../../utils';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            isShowConfirmPassword: false,
            formData: {
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            formErrors: {},
        }
    }

    handleInputChange = (event, field) => {
        const { formData, formErrors } = this.state;

        let input = event.target.value;
        formData[field] = input;

        // Cập nhật lỗi nếu có
        if (input !== '') {
            formErrors[field] = this.validateField(field, formData[field]);
        } else {
            formErrors[field] = '';
        }
        this.setState({ formData, formErrors });
    }

    validateField = (field, value) => {
        switch (field) {
            case 'fullName':
                return validateAlphabetic(value) ? '' : 'Fullname can only contain letters';
            case 'email':
                return validateEmail(value) ? '' : 'Invalid email';
            case 'password': {
                const errorMessage = validatePassword(value);
                return errorMessage ? errorMessage : '';
            }
            case 'confirmPassword':
                return value === this.state.formData.password ? '' : 'Passwords do not match';
            default:
                return '';
        }
    }

    hanldeShowHidePassword = (data) => {
        if (data === SIGNUP.PW) {
            this.setState({ isShowPassword: !this.state.isShowPassword });
        }
        else {
            this.setState({ isShowConfirmPassword: !this.state.isShowConfirmPassword });
        }
    }

    handleRegisterUser = async () => {
        const { formData, formErrors } = this.state;

        // Check toàn bộ form có lỗi hay không
        const hasErrors = Object.values(formErrors).some(error => error !== '') ||
            Object.values(formData).some(value => value === '');

        if (hasErrors) {
            this.setState({ errMessage: 'Please fill all fields correctly' });
            return;
        }
        try {

            let data = await createNewUserService({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                roleId: ROLE.User
            });

            if (data && data.errCode === 0) {
                this.props.navigate(path.LOGIN);
            } else {
                this.setState({
                    errMessage: data.errMessage
                });
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
        const { formData, formErrors } = this.state;
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
                                            className={`form-control ${formErrors.fullName ? 'error' : ''}`}
                                            placeholder='Enter your full name'
                                            value={formData.fullName}
                                            onChange={(event) => this.handleInputChange(event, 'fullName')}
                                            type='text'
                                        />
                                    </div>
                                    <div className='col-12' style={{ color: 'red' }}>
                                        {formErrors.fullName}
                                    </div>

                                    <div className='col-12 form-group sign-up-input' >
                                        <label>Email</label>
                                        <input
                                            className={`form-control ${formErrors.email ? 'error' : ''}`}
                                            placeholder='Enter your email'
                                            value={formData.email}
                                            onChange={(event) => this.handleInputChange(event, 'email')}
                                            type='email'
                                        />
                                    </div>
                                    <div className='col-12' style={{ color: 'red' }}>
                                        {formErrors.email}
                                    </div>

                                    <div className='col-12 form-group sign-up-input' >
                                        <label>Password</label>
                                        <div className='custom-input-password'>
                                            <input
                                                className={`form-control ${formErrors.password ? 'error' : ''}`}
                                                placeholder='Enter your password'
                                                value={formData.password}
                                                onChange={(event) => this.handleInputChange(event, 'password')}
                                                type={this.state.isShowPassword ? "text" : 'password'}
                                            />
                                            <span onClick={() => { this.hanldeShowHidePassword(SIGNUP.PW) }}>
                                                <i className={this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='col-12' style={{ color: 'red' }}>
                                        {formErrors.password}
                                    </div>

                                    <div className='col-12 form-group sign-up-input' >
                                        <label>Confirm Password</label>
                                        <div className='custom-confirm-password'>
                                            <input
                                                className={`form-control ${formErrors.confirmPassword ? 'error' : ''}`}
                                                placeholder='Enter your confirm password'
                                                value={formData.confirmPassword}
                                                onChange={(event) => this.handleInputChange(event, 'confirmPassword')}
                                                type={this.state.isShowConfirmPassword ? "text" : 'password'}
                                            />
                                            <span onClick={() => { this.hanldeShowHidePassword(SIGNUP.CP) }}>
                                                <i className={this.state.isShowConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='col-12' style={{ color: 'red' }}>
                                        {formErrors.confirmPassword}
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
                                    <div className='col-12' >
                                        <div className='login-account'>
                                            <span>Have an account? </span>
                                            <span><a href={path.LOGIN}>Login here</a></span>
                                        </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
