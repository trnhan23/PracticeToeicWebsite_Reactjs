import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import * as actions from "../../../store/actions";
import { push } from "connected-react-router";
import { path } from '../../../utils';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
            currentPath: window.location.pathname, //lấy url hiện tại
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    toggleMenu = (checkLogin) => {
        if (!checkLogin) {
            this.props.navigate('/login');
        } else {
            this.setState({ isMenuOpen: !this.state.isMenuOpen });
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ isMenuOpen: false });
        }
    }

    render() {
        const { isMenuOpen, currentPath } = this.state;
        const { isLoggedIn, userInfor, processLogout } = this.props;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>

                        <div className='left-content'>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className={`child-content ${currentPath === path.HOMEPAGE ? 'active' : ''}`}>
                                <div><a href={path.HOMEPAGE}><b>Trang chủ</b></a></div>
                            </div>
                            <div className={`child-content ${currentPath === path.SEARCH_WORD ? 'active' : ''}`}>
                                <div><a href={path.SEARCH_WORD}><b>Tra từ</b></a></div>
                            </div>
                            <div className={`child-content ${currentPath === path.TOEIC_EXAM ? 'active' : ''}`}>
                                <div><a href={path.TOEIC_EXAM}><b>Đề thi TOEIC</b></a></div>
                            </div>
                            <div className={`child-content ${currentPath === '/' ? 'active' : ''}`}>
                                <div><a href={path.FLASHCARD}><b>Flashcards</b></a></div>
                            </div>
                            <div className={`child-content ${currentPath === '/' ? 'active' : ''}`}>
                                <div><a href="#"><b>Blog</b></a></div>
                            </div>
                            <div className={`child-content ${currentPath === '/' ? 'active' : ''}`}>
                                <div><a href="#"><b>Kết quả luyện thi</b></a></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div
                                className='user-menu'
                                ref={(node) => { this.wrapperRef = node; }}
                            >
                                <button
                                    className='btn-right-content dropdown-toggle'
                                    onClick={() => { this.toggleMenu(isLoggedIn) }}
                                >
                                    {userInfor && userInfor.fullName ? userInfor.fullName : 'Đăng nhập'}
                                </button>
                                {isMenuOpen && isLoggedIn && (
                                    <div className="dropdown-menu show">
                                        <a className="dropdown-item" href="#">Thông tin cá nhân</a>
                                        {/* <a className="dropdown-item" href="#">Another action</a> */}
                                        {/* <a className="dropdown-item" href="#">Something else here</a> */}
                                        <div className="dropdown-divider"></div>
                                        <a
                                            className="dropdown-item"
                                            href="/login"
                                            onClick={processLogout}
                                        >
                                            Đăng xuất
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
