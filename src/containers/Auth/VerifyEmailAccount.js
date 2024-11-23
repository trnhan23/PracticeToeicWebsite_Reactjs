import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import CustomScrollbars from '../../components/CustomScrollbars';
import HomeHeader from '../User/HomePage/HomeHeader';
import HomeFooter from '../User/HomePage/HomeFooter';
import { verifyEmailAccount } from '../../services/userService';
import Loading from '../../components/Loading/Loading';
import './VerifyEmailAccount.scss';

class VerifyEmailAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get("token");
            const email = urlParams.get("email");

            try {
                let res = await verifyEmailAccount({ token, email });
                if (res && res.errCode === 0) {
                    this.setState({
                        statusVerify: true,
                        errCode: res.errCode
                    });
                } else {
                    this.setState({
                        statusVerify: false,
                        errCode: -1
                    });
                }
            } catch (error) {
                console.error("Error during email verification: ", error);
                this.setState({
                    statusVerify: false,
                    errCode: -1
                });
            }
        }
    }

    render() {
        const { statusVerify, errCode } = this.state;

        return (
            <Fragment>
                <HomeHeader />
                <div className="fireworks-background">
                    <CustomScrollbars style={{ height: '95vh', width: '100%' }}>
                        <div className="verify-email-wrapper">
                            <div className="verify-email-content">
                                <div
                                    alt="SkillUp Toeic Logo"
                                    className="verify-email-logo"
                                />
                                {statusVerify === false ? (
                                    <Loading />
                                ) : (
                                    <div
                                        className={`verify-email-message ${
                                            errCode === 0 ? 'success' : 'failure'
                                        }`}
                                    >
                                        <h1>
                                            {errCode === 0
                                                ? '🎉 Chúc mừng! Xác thực thành công!'
                                                : '😢 Rất tiếc! Xác thực thất bại!'}
                                        </h1>
                                        <p>
                                            {errCode === 0
                                                ? 'Cảm ơn bạn đã xác thực email. Khởi động hành trình học tập tuyệt vời cùng chúng tôi ngay nào!'
                                                : 'Đã có lỗi xảy ra trong quá trình xác thực. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CustomScrollbars>
                </div>
                <HomeFooter />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailAccount);
