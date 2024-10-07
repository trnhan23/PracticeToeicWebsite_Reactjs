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
        }
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
        })
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
        })
    }


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
                                <div className='col-12 form-group login-input' >

                                    <label>Email</label>
                                    <input value={this.state.email}
                                        onChange={(event) => this.handleOnChangeEmail(event)}
                                        onBlur={() => { this.checkEmail() }}
                                        type='email'
                                        className={`form-control ${this.state.isErrorEmail ? 'error' : ''}`}
                                        placeholder='Enter your email'>
                                    </input>
                                </div>
                                <div className='col-12 form-group login-input'>

                                    <label>Password</label>
                                    <div className='custom-input-password' >
                                        <input className={`form-control ${this.state.isErrorPassword ? 'error' : ''}`}
                                            onChange={(event) => { this.handleOnChangePassword(event) }}
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            placeholder='Enter your password'>
                                        </input>
                                        <span onClick={() => { this.hanldeShowHidePassword() }}>
                                            <i className={this.state.isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i>
                                        </span>
                                    </div>

                                </div>
                                <div className='col-12' style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className='col-12' ><button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button></div>

                                <div className='col-12 forgot-register'>
                                    <span className='forgot-password'><a href='#'>Forgot your password?</a></span>
                                    <span className='register'><a href={path.REGISTER}>Register here</a></span>
                                </div>
                                <div className='col-12 text-center mt-3'>
                                    <span className='text-other-login'> Or Sign Up Using</span>
                                </div>
                                <div className='col-12 social-login'>
                                    <i className="fa-brands fa-google-plus-g google"></i>
                                    <i className="fa-brands fa-facebook-f facebook"></i>
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
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
