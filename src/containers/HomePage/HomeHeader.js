import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import * as actions from "../../store/actions";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
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

    toggleMenu() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ isMenuOpen: false });
        }
    }

    render() {
        const { isMenuOpen } = this.state;
        const { isLoggedIn, userInfor, processLogout } = this.props;
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
                            <div
                                className='user-menu'
                                ref={(node) => { this.wrapperRef = node; }}
                            >
                                <button
                                    className='btn-right-content dropdown-toggle'
                                    onClick={this.toggleMenu}
                                >
                                    {userInfor && userInfor.fullName ? userInfor.fullName : 'Đăng nhập'}
                                </button>
                                {isMenuOpen && isLoggedIn && (
                                    <div className="dropdown-menu show">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                        <div className="dropdown-divider"></div>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={processLogout}
                                        >
                                            Đăng xuất
                                        </a>
                                    </div>
                                )}
                            </div>
                            {/* <div className="btn-group">
                                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Action
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Separated link</a>
                                </div>
                            </div> */}

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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
