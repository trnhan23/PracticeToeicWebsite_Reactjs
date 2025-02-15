import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './Situation.scss';

class Situation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount = async () => {

    }

    render() {

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='situation-container'>
                        <div className='situation-content'>
                            <div className='situation-title'>Chủ đề: FOOD</div>
                            <div className='content-top'>
                                <div className='cont left'>
                                    <div className='tle'>Tình huống</div>
                                    <div className='context'>
                                        Người yêu dẫn bạn về nhà chơi.
                                        Thật trớ trêu bố cô, ông Minh là giám đốc một công ty
                                        Ông hiểu nhầm con gái mình mang ứng viên đi cửa sau.
                                        Vậy mới có một buổi phỏng vấn cùng nhạc phụ đại nhân tương lại
                                    </div>
                                </div>
                                <div className='cont right'>
                                    <div className='tle'>Gợi ý</div>
                                    <div className='context'>
                                        My name is Hien
                                    </div>
                                </div>
                            </div>
                            <div className="content-bottom">

                                <div className="mess received">
                                    <img className="avatar" src="https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg" alt="Bot" />
                                    <div className="mess-box">
                                        <div className="text">
                                            I don’t like people who take advantage of relationships to get a job.
                                            But since my daughter brought you here, I will make an exception.
                                            So, what is your name?
                                        </div>
                                    </div>
                                </div>

                                <div className="mess sent">
                                    <div className="mess-box">
                                        <div className="text">My name is Hien</div>
                                        <button className="detail-button">Chi tiết</button>
                                    </div>
                                    <img className="avatar" src="https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg" alt="User" />
                                </div>
                            </div>
                        </div>
                    </div>

                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    userInfor: state.user.userInfor,
    exam: state.user.selectedExam,
});

const mapDispatchToProps = (dispatch) => ({
    navigate: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Situation);
