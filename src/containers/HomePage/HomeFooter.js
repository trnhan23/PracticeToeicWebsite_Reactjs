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
                            <p>Thư viện đề thi</p>
                            <p>Blog</p>
                            <p>Nhóm học tập</p>
                        </div>
                        <div className='footer-content2'>
                            <div className='fontcontent'>Hỗ trợ</div>
                            <p>Hướng dẫn sử dụng</p>
                            <p>Chăm sóc khách hàng</p>
                            <p>Phản hồi hiếu nại</p>
                        </div>
                        <div className='footer-content3'>
                            <div className='fontcontent'>SKILLUP</div>
                            <p>Liên hệ</p>
                            <p>Điều khoản bảo mật</p>
                            <p>Điều khoản sử dụng</p>
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
