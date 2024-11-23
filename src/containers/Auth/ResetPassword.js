import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import CustomScrollbars from '../../components/CustomScrollbars';
import HomeHeader from '../User/HomePage/HomeHeader';
import HomeFooter from '../User/HomePage/HomeFooter';
import './ResetPassword.scss';
import { validateEmail, validatePassword } from '../../validation/Validated';
import { path } from '../../utils';
import { toast } from 'react-toastify';
import { sendCode } from '../../services/userService';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            email: '',
            password: '',
            confirmPassword: '',
            code: '',
            isShowPassword: false,
            isShowConfirmPassword: false,
            isErrorEmail: false,
            isErrorCode: false,
            isErrorPassword: false,
            isErrorConfirmPassword: false,
            errMessage: ''
        };
    }

    componentDidMount = () => {
        const urlParams = new URLSearchParams(this.props.location.search);
        const type = urlParams.get("type");
        const { navigate } = this.props;
        try {
            if (type === 'change') {
                const userData = localStorage.getItem("persist:user");
                const parsedData = JSON.parse(userData);
                const userInfo = JSON.parse(parsedData.userInfor);

                this.setState({
                    email: userInfo.email,
                    type: 'change'
                });

            } else if (type === 'forget') {

                this.setState({
                    type: 'forget'
                });

            } else {
                navigate(`${path.LOGIN}`);
            }
        } catch (error) {
            console.error("Error during email verification: ", error);
        }
    };

    handleOnChangeEmail = (event) => {
        this.setState({ email: event.target.value }, this.checkEmail);
    }

    handleOnChangeCode = (event) => {
        this.setState({ code: event.target.value });
    }

    checkEmail = () => {
        const email = this.state.email;
        if (validateEmail(email)) {
            this.setState({ isErrorEmail: false, errMessage: '' });
        } else {
            this.setState({ isErrorEmail: true, errMessage: 'Invalid email format' });
        }
    }

    handleOnChangePassword = (event) => {
        this.setState({ password: event.target.value }, this.checkPassword);
    }

    checkPassword = () => {
        const password = this.state.password;
        if (!validatePassword(password)) {
            this.setState({ isErrorPassword: false, errMessage: '' });
        } else {
            this.setState({ isErrorPassword: true, errMessage: 'Password must be at least 8 characters long and contain both letters and numbers' });
        }
    }

    handleOnChangeConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value }, this.checkConfirmPassword);
    }

    checkConfirmPassword = () => {
        const { password, confirmPassword } = this.state;
        if (confirmPassword === password) {
            this.setState({ isErrorConfirmPassword: false, errMessage: '' });
        } else {
            this.setState({ isErrorConfirmPassword: true, errMessage: 'Passwords do not match' });
        }
    }

    handleResetPassword = async () => {
        this.setState({ errMessage: '' });

        // Validate before submitting
        if (this.state.isErrorEmail || this.state.isErrorPassword || this.state.isErrorConfirmPassword) {
            toast.error("Please fix the errors before submitting.");
            return;
        }

        try {
            alert("Click reset password")
            // let data = await handleResetPasswordApi(this.state.email, this.state.password);
            // if (data && data.errCode === 0) {
            //     toast.success("Password reset successfully!");
            //     this.props.navigate(path.LOGIN);
            // } else {
            //     this.setState({ errMessage: data.message });
            //     toast.error("Password reset failed!");
            // }
        } catch (error) {
            this.setState({ errMessage: 'Something went wrong, please try again later.' });
        }
    }

    hanldeShowHidePassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    }

    hanldeShowHideConfirmPassword = () => {
        this.setState({ isShowConfirmPassword: !this.state.isShowConfirmPassword });
    }

    handleSendCode = async () => {
        if (this.state.email === '') {
            this.setState({
                errMessage: 'Vui lòng nhập email'
            })
        } else {
            const resSendCode = await sendCode({
                email: this.state.email
            });
            if (resSendCode.errCode === 0){
                toast.success("Gửi email thành công!");

                


            } else {
                toast.error("Gửi email thất bại!");
            }
        }
    }

    render() {
        const { type } = this.state;
        return (
            <Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                    <div className='login-background'>
                        <div className='login-container'>
                            <div className='login-content row'>
                                <div className='logo-login'></div>
                                <div className='col-12 text-login'>RESET PASSWORD</div>
                                <div className='col-12 form-group login-input'>
                                    <label>Email</label>
                                    <div className='btn-email' style={{ display: 'flex' }}>
                                        <input value={this.state.email}
                                            onChange={this.handleOnChangeEmail}
                                            type='email'
                                            className={`form-control ${this.state.isErrorEmail ? 'error' : ''}`}
                                            placeholder='Enter your email'
                                            disabled={type === 'change' ? true : false} />
                                        <button className='btn-code'
                                            onClick={this.handleSendCode}
                                            style={{
                                                backgroundColor: '#4CAF50',
                                                color: 'white',
                                                padding: '0px 20px',
                                                fontSize: '14px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
                                        >Gửi</button>
                                    </div>

                                </div>
                                <div className='col-12 form-group login-input'>
                                    <label>Code</label>
                                    <input value={this.state.code}
                                        onChange={this.handleOnChangeCode}
                                        type='number'
                                        className={`form-control ${this.state.isErrorCode ? 'error' : ''}`}
                                        placeholder='Enter your code' />
                                </div>

                                <div className='col-12 form-group login-input'>
                                    <label>Password</label>
                                    <div className='custom-input-password'>
                                        <input value={this.state.password}
                                            onChange={this.handleOnChangePassword}
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            className={`form-control ${this.state.isErrorPassword ? 'error' : ''}`}
                                            placeholder='Enter new password' />
                                        <span onClick={this.hanldeShowHidePassword}>
                                            <i className={this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                        </span>
                                    </div>
                                </div>
                                <div className='col-12 form-group login-input'>
                                    <label>Confirm Password</label>
                                    <div className='custom-input-password'>
                                        <input value={this.state.confirmPassword}
                                            onChange={this.handleOnChangeConfirmPassword}
                                            type={this.state.isShowConfirmPassword ? 'text' : 'password'}
                                            className={`form-control ${this.state.isErrorConfirmPassword ? 'error' : ''}`}
                                            placeholder='Confirm your password' />
                                        <span onClick={this.hanldeShowHideConfirmPassword}>
                                            <i className={this.state.isShowConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                        </span>
                                    </div>
                                </div>
                                <div className='col-12' style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className='col-12'>
                                    <button className='btn-login' onClick={this.handleResetPassword}>Reset Password</button>
                                </div>
                                <div className='col-12 forgot-register'>
                                    <span className='forgot-password'><a href={path.LOGIN}>Back</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfor: state.user.userInfor,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
