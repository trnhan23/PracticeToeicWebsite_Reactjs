import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import CustomScrollbars from '../../../components/CustomScrollbars';
import { push } from "connected-react-router";
import './SpeechBox.scss';
import TopicCard from '../../../components/LuyenNoi/TopicCard';


class SpeechBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTopicId: '',
            searchTopic: '',
            topics: [],
        };
    }

    componentDidMount = async () => {
        this.setState({
            topics: [
                { id: 1, title: "FOOD", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-102.jpg" },
                { id: 2, title: "BOOK", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-102.jpg" },
                { id: 3, title: "TRAVEL", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-53.jpg" },
                { id: 4, title: "TECH", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-102.jpg" },
                { id: 5, title: "TECH", image: "https://cdn-media.sforum.vn/storage/app/media/anh-dep-53.jpg" }
            ]
        })
    }

    handleTopicSelect = (id) => {
        this.setState({ selectedTopicId: id });
    };

    handlePractice = () => {
        const id = this.state.selectedTopicId;
        if (id !== null || id !== '') {
            const { navigate } = this.props;
            const redirectPath = `/speech-box/${id}`;
            navigate(`${redirectPath}`);
        }
    }

    handleOnChangeSearch = (event) => {
        this.setState({ searchTopic: event.target.value });
    }

    filterTopics = () => {
        const { searchTopic, topics } = this.state;
        return topics.filter(topic =>
            topic.title.toLowerCase().includes(searchTopic.toLowerCase())
        );
    }

    render() {
        const topics = this.filterTopics();

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
                                    placeholder='Tìm kiếm: Nhập chủ đề bạn muốn luyện nói'
                                    value={this.state.searchTopic}
                                    onChange={(event) => { this.handleOnChangeSearch(event) }}
                                />
                            </div>

                            <div className='speech-box-topic-card'>
                                <TopicCard topics={topics} onSelectTopic={this.handleTopicSelect} />
                            </div>
                            <button className='button' onClick={this.handlePractice}>Luyện tập</button>
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
