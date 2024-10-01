import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>

                        <div className='left-content'>
                            <div className='header-logo'></div>
                        </div>

                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Trang chủ</b></div>
                            </div>
                            <div className='child-content'>
                                <div><b>Tra từ</b></div>
                            </div>
                            <div className='child-content'>
                                <div><b>Đề thi TOEIC</b></div>
                            </div>
                            <div className='child-content'>
                                <div><b>Flashcards</b></div>
                            </div>
                            <div className='child-content'>
                                <div><b>Blog</b></div>
                            </div>
                            <div className='child-content'>
                                <div><b>Kết quả luyện thi</b></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <button className='btn-right-content'>Đăng nhập</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
