import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { handleLoginApi } from '../../services/userService';

import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../components/CustomScrollbars';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({ errMessage: '' });

        try {
            let data = await handleLoginApi(this.state.email, this.state.password);

            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
                this.props.navigate('/home');
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
                                        type='email'
                                        className='form-control'
                                        placeholder='Enter your email'>
                                    </input>
                                </div>
                                <div className='col-12 form-group login-input'>

                                    <label>Password</label>
                                    <div className='custom-input-password' >
                                        <input className='form-control'
                                            onChange={(event) => { this.handleOnChangePassword(event) }}
                                            type={this.state.isShowPassword ? "text" : 'password'}
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
                                    <span className='forgot-password'>Forgot your password?</span>
                                    <span className='register'>Register here </span>
                                </div>
                                <div className='col-12 text-center mt-3'>
                                    <span className='text-other-login'> Or Login with:</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
