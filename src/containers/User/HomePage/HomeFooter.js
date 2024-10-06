import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss'

class HomeFooter extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-footer-container'>
                    <div className='home-footer-logo'></div>
                    <div className='home-footer-content'>
                        <div className='footer-content1'>
                            <div className='fontcontent'>Tài nguyên</div>
                            <div>Thư viện đề thi</div>
                            <div>Blog</div>
                            <div>Nhóm học tập</div>
                        </div>
                        <div className='footer-content2'>
                            <div className='fontcontent'>Hỗ trợ</div>
                            <div>Hướng dẫn sử dụng</div>
                            <div>Chăm sóc khách hàng</div>
                            <div>Phản hồi hiếu nại</div>
                        </div>
                        <div className='footer-content3'>
                            <div className='fontcontent'>SKILLUP</div>
                            <div>Liên hệ</div>
                            <div>Điều khoản bảo mật</div>
                            <div>Điều khoản sử dụng</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
