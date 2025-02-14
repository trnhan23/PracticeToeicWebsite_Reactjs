import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './SpeechBox.scss';
import TopicCard from '../../../components/LuyenNoi/TopicCard';


class SpeechBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTopicId: null,

        };
    }

    handleTopicSelect = (id) => {
        this.setState({ selectedTopicId: id });
    };

    render() {
        const topics = [
            { id: 1, title: "FOOD", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-102.jpg" },
            { id: 2, title: "BOOK", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-102.jpg" },
            { id: 3, title: "TRAVEL", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-53.jpg" },
            { id: 4, title: "TECH", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-102.jpg" },
            { id: 5, title: "TECH", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-53.jpg" }
        ];

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                    <HomeHeader />
                    <div className='speech-box-container'>
                        <div className='speech-box-content'>
                            <div className='speech-box-title'>Speech Box</div>

                            <div className='speech-box-search'>
                                <input
                                    className='speech-box-search-input'
                                    type='text'
                                    placeholder='Nhập chủ đề bạn muốn luyện nói'
                                />
                                <button className='speech-box-search-button'>Tìm kiếm</button>
                            </div>

                            <div className='speech-box-topic-card'>
                                <TopicCard topics={topics} onSelectTopic={this.handleTopicSelect} />
                            </div>
                            <button className='button'>Luyện tập</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpeechBox);
