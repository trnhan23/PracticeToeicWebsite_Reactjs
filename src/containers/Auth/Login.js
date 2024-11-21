import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import '@fortawesome/fontawesome-free/css/all.min.css';

import CustomScrollbars from '../../components/CustomScrollbars';
import HomeHeader from '../User/HomePage/HomeHeader';
import HomeFooter from '../User/HomePage/HomeFooter';
import './Login.scss';
import { handleLoginApi } from '../../services/userService';
import { validateEmail } from '../../validation/Validated';
import { path } from '../../utils';
import { toast } from 'react-toastify';
require('dotenv').config();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            isErrorEmail: false,
            isErrorPassword: false,
            errMessage: ''
        };
    }

    componentDidMount() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v15.0'
            });
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    handleOnChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    checkEmail = () => {
        let email = this.state.email;
        if (validateEmail(email) || email === '') {
            this.setState({
                isErrorEmail: false,
                errMessage: ''
            });
        } else {
            this.setState({
                isErrorEmail: true,
                errMessage: `Invalid email`
            });
        }
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin = async () => {
        this.setState({
            errMessage: '',
            isErrorEmail: false,
            isErrorPassword: false,
        });

        try {
            let data = await handleLoginApi(this.state.email, this.state.password);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                    isErrorEmail: true,
                    isErrorPassword: true,
                });
            }
            if (data && data.errCode === 0) {
                toast.success("Login success");
                this.props.userLoginSuccess(data.user);
                this.props.navigate(path.HOMEPAGE);
            }
        } catch (error) {
            if (error.response) {
                const errMessage = error.response.data.message;
                this.setState({ errMessage });
            }
            console.log('Error', error.response || error);
        }
    }

    hanldeShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    handleGoogleLogin = () => {
        const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=` + `${process.env.REACT_APP_BACKEND_URL}` + `/auth/google/callback&client_id=` + `${process.env.REACT_APP_GG_CLIENT_ID}` + `&scope=profile email&response_type=code&access_type=offline&prompt=consent`;
        console.log("kt: ", googleLoginUrl);
        const width = 500;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        const googleLoginWindow = window.open(
            googleLoginUrl,
            'Google Login',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        window.addEventListener('message', (event) => {
            if (event.origin === `${process.env.REACT_APP_BACKEND_URL}` && event.data.user) {
                this.props.userLoginSuccess(event.data.user);
                toast.success("Login Google thành công!");

                googleLoginWindow.close();
                this.props.navigate(path.HOMEPAGE);
            }
        });
    };

    handleFacebookLogin = () => {
        const facebookLoginUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&redirect_uri=${process.env.REACT_APP_BACKEND_URL}/auth/facebook/callback&scope=email`;
        const width = 500;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        const facebookLoginWindow = window.open(
            facebookLoginUrl,
            'Facebook Login',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        window.addEventListener('message', (event) => {
            if (event.origin === `${process.env.REACT_APP_BACKEND_URL}` && event.data.user) {
                this.props.userLoginSuccess(event.data.user);
                toast.success("Login Facebook thành công!");
                facebookLoginWindow.close();
                this.props.navigate(path.HOMEPAGE);
            }
        });
    };


    render() {
        return (
            <Fragment>
                <HomeHeader />
                <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                    <div className='login-background'>
                        <div className='login-container'>
                            <div className='login-content row'>
                                <div className='logo-login'></div>
                                <div className='col-12 text-login'>LOGIN</div>
                                <div className='col-12 form-group login-input'>
                                    <label>Email</label>
                                    <input value={this.state.email}
                                        onChange={this.handleOnChangeEmail}
                                        onBlur={this.checkEmail}
                                        type='email'
                                        className={`form-control ${this.state.isErrorEmail ? 'error' : ''}`}
                                        placeholder='Enter your email'>
                                    </input>
                                </div>
                                <div className='col-12 form-group login-input'>
                                    <label>Password</label>
                                    <div className='custom-input-password'>
                                        <input className={`form-control ${this.state.isErrorPassword ? 'error' : ''}`}
                                            onChange={this.handleOnChangePassword}
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            placeholder='Enter your password'>
                                        </input>
                                        <span onClick={this.hanldeShowHidePassword}>
                                            <i className={this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                        </span>
                                    </div>
                                </div>
                                <div className='col-12' style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className='col-12'>
                                    <button className='btn-login' onClick={this.handleLogin}>Login</button>
                                </div>
                                <div className='col-12 forgot-register'>
                                    <span className='forgot-password'><a href='#'>Forgot your password?</a></span>
                                    <span className='register'><a href={path.REGISTER}>Register here</a></span>
                                </div>
                                <div className='col-12 text-center mt-3'>
                                    <span className='text-other-login'> Or Sign Up Using</span>
                                </div>
                                <div className='col-12 social-login'>
                                    <i
                                        id='iconGoogle'
                                        className="fa-brands fa-google-plus-g google"
                                        onClick={this.handleGoogleLogin}
                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                        title="Login with Google"
                                    ></i>
                                    <i
                                        id='iconFacebook'
                                        className="fa-brands fa-facebook-f facebook"
                                        onClick={this.handleFacebookLogin}
                                        style={{ cursor: 'pointer' }}
                                        title="Login with Facebook"
                                    ></i>

                                </div>
                            </div>
                        </div>
                    </div>
                    <HomeFooter />
                </CustomScrollbars>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
