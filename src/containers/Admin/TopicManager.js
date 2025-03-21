import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TopicManager.scss';
import { getAllTopics, deleteTopic } from '../../services/topicService.js';
import TopicPopup from './TopicPopup';

class TopicManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopics: [],
            isPopupOpen: false,
            editTopic: null, // Lưu chủ đề đang chỉnh sửa
        };
    }

    async componentDidMount() {
        await this.getAllTopicsFromReact();
    }

    getAllTopicsFromReact = async () => {
        try {
            let response = await getAllTopics('ALL');
            if (response && response.errCode === 0 && Array.isArray(response.topics)) {
                this.setState({ arrTopics: response.topics });
            } else {
                console.error("Lỗi: response không chứa mảng topics hợp lệ", response);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    togglePopup = (topic = null) => {
        this.setState({
            isPopupOpen: !this.state.isPopupOpen,
            editTopic: topic, // Nếu có topic, sẽ là cập nhật, nếu không thì là thêm mới
        });
    };

    handleSave = async () => {
        await this.getAllTopicsFromReact();
        this.setState({ isPopupOpen: false, editTopic: null });
    };

    handleDeleteTopic = async (id) => {
        try {
            let response = await deleteTopic(id);
            if (response && response.errCode === 0) {
                await this.getAllTopicsFromReact();
            } else {
                console.error("Lỗi khi xóa chủ đề:", response.errMessage);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API xóa:", error);
        }
    };

    render() {
        let { arrTopics, isPopupOpen, editTopic } = this.state;

        if (!Array.isArray(arrTopics)) {
            arrTopics = [];
        }

        return (
            <div className="topics-container">
                <div className='title text-center'>QUẢN LÝ CHỦ ĐỀ</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.togglePopup()}>
                        <i className="fa fa-plus"></i> Thêm chủ đề
                    </button>

                    <TopicPopup
                        isOpen={isPopupOpen}
                        onClose={this.togglePopup}
                        onSave={this.handleSave}
                        editTopic={editTopic} // Truyền topic cần sửa
                    />
                </div>

                <div className='topics-table mt-3 mx-1'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Hình ảnh</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrTopics.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        <img src={item.image} alt="Topic" />
                                    </td>
                                    <td>
                                        <button className="btn-edit" onClick={() => this.togglePopup(item)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="btn-delete" onClick={() => this.handleDeleteTopic(item.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}

export default connect(null, null)(TopicManager);
