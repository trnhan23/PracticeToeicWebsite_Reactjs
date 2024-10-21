import React, { Component } from 'react';
import './BinhLuan.scss';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import Loading from '../Loading/Loading';
class BinhLuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exam: [],

            // comments: [
            //     {
            //         id: 1,
            //         fullName: 'hoainbzz.2004',
            //         avatar: 'https://i.pravatar.cc/300?img=2',
            //         cmtDate: 'July 06, 2024',
            //         text: 'ai giải thích hộ mình câu 30 part 2 là sao z được không ạ',
            //         replies: [
            //             {
            //                 id: 2,
            //                 fullName: 'NguyenDng_71297',
            //                 avatar: 'https://i.pravatar.cc/300?img=2',
            //                 cmtDate: 'July 07, 2024',
            //                 text: 'câu c chúng ta có cùng 1 cái máy tính trong 5 năm, ý là muốn dùng số tiền thừa đó để mua cái mới đó ạ',
            //                 replies: [
            //                     {
            //                         id: 3,
            //                         fullName: 'dienpguynenz',
            //                         avatar: 'https://i.pravatar.cc/300?img=2',
            //                         cmtDate: 'May 11, 2024',
            //                         text: 'Mn cho mình hỏi aim 750 thì part 5 cần đúng khoảng bnh câu ạ? mình cảm ơn.',
            //                         replies: [],
            //                     },
            //                 ],
            //             },
            //         ],
            //     },
            //     {
            //         id: 4,
            //         fullName: 'NguyenDng_71297',
            //         avatar: 'https://i.pravatar.cc/300?img=2',
            //         cmtDate: 'July 07, 2024',
            //         text: 'câu c chúng ta có cùng 1 cái máy tính trong 5 năm, ý là muốn dùng số tiền thừa đó để mua cái mới đó ạ',
            //         replies: [],
            //     },
            // ],
            comments: [],
            loading: true,
            newComment: '',
            replyText: '',
            replyingTo: null,
            replyingToReply: null,
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: false
        })
        this.handleSaveComment();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.comments !== this.state.comments) {
            // Có thể thực hiện hành động nào đó khi state comments thay đổi
            console.log('Comments have been updated:', this.state.comments);
        }

        if (prevProps.normalizedComments !== this.props.normalizedComments) {
            this.setState({
                comments: this.props.normalizedComments
            });
        }
    }

    handleAddComment = () => {
        if (this.state.newComment.trim() === '') return;
        const newCommentData = {
            id: this.state.comments.length + 1,
            fullName: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            cmtDate: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
            text: this.state.newComment.trim(),
            replies: [],
        };
        this.setState(prevState => ({
            comments: [newCommentData, ...prevState.comments],
            newComment: '',
        }));
    };

    handleAddReply = (parentId) => {
        if (this.state.replyText.trim() === '') return;
        const newReply = {
            id: Math.random(),
            fullName: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            cmtDate: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
            text: this.state.replyText.trim(),
            replies: [],
        };

        this.setState(prevState => ({
            comments: prevState.comments.map(comment =>
                comment.id === parentId
                    ? { ...comment, replies: [...comment.replies, newReply] }
                    : comment
            ),
            replyText: '',
            replyingTo: null,
            replyingToReply: null,
        }));
    };

    handleAddReplyToReply = (parentId) => {
        if (this.state.replyText.trim() === '') return;
        const newReply = {
            id: Math.random(),
            fullName: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            cmtDate: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
            text: this.state.replyText.trim(),
            replies: [],
        };

        const addReplyToComment = (comments) => {
            return comments.map((comment) => {
                if (comment.id === parentId) {
                    return { ...comment, replies: [...comment.replies, newReply] };
                } else if (comment.replies.length > 0) {
                    return { ...comment, replies: addReplyToComment(comment.replies) };
                }
                return comment;
            });
        };

        this.setState(prevState => ({
            comments: addReplyToComment(prevState.comments),
            replyText: '',
            replyingToReply: null,
        }));
    };

    handleDeleteComment = (commentId) => {
        this.setState(prevState => ({
            comments: prevState.comments.filter(comment => comment.id !== commentId)
        }));
    };

    handleDeleteReply = (commentId, replyId) => {
        const deleteReply = (comments) => {
            return comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: comment.replies.filter(reply => reply.id !== replyId),
                    };
                } else if (comment.replies.length > 0) {
                    return { ...comment, replies: deleteReply(comment.replies) };
                }
                return comment;
            });
        };

        this.setState(prevState => ({
            comments: deleteReply(prevState.comments),
        }));
    };

    renderReplies = (replies, parentId) => {
        replies.map(reply => (
            <li key={reply.id} className="comment-item reply">
                <div className="comment-header">
                    <img src={reply.avatar} alt={`${reply.fullName}'s avatar`} className="avatar" />
                    <span className="fullName">{reply.fullName}</span>
                    <span className="cmtDate">, {reply.cmtDate}</span>
                </div>
                <p className="comment-text">{reply.text}</p>
                <button
                    className="reply-button"
                    onClick={() => this.setState({ replyingToReply: reply.id })}
                >
                    Trả lời
                </button>
                <button
                    className="delete-button"
                    onClick={() => this.handleDeleteReply(parentId, reply.id)}
                >
                    Xóa
                </button>

                {this.state.replyingToReply === reply.id && (
                    <div className="reply-input">
                        <input
                            type="text"
                            placeholder="Nhập câu trả lời ..."
                            value={this.state.replyText}
                            onChange={(e) => this.setState({ replyText: e.target.value })}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && this.handleAddReplyToReply(reply.id)
                            }
                        />
                        <button onClick={() => this.handleAddReplyToReply(reply.id)}>
                            Gửi
                        </button>
                    </div>
                )}

                {reply.replies.length > 0 && (
                    <ul className="reply-list">{this.renderReplies(reply.replies, reply.id)}</ul>
                )}
            </li>
        ));
    }

    handleSaveComment = () => {
        const { normalizedComments } = this.props;
        if (normalizedComments) {
            this.setState({
                comments: normalizedComments
            }, () => {
                console.log("KT handleSaveComment: ", this.state.comments);
            });
        } else {
            console.warn("normalizedComments is undefined or null.");
        }
    }

    render() {
        const { loading } = this.state;
        const { normalizedComments } = this.props;
        if (loading) {
            return <div><Loading /></div>;
        }
        return (
            <div className="binh-luan-container">
                <h3>Bình luận</h3>
                <div className="comment-input">
                    <input
                        type="text"
                        placeholder="Chia sẻ cảm nghĩ của bạn ..."
                        value={this.state.newComment}
                        onChange={(e) => this.setState({ newComment: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && this.handleAddComment()}
                    />
                    <button onClick={this.handleAddComment}>Gửi</button>
                </div>
                <ul className="comment-list">
                    {normalizedComments.map(comment => (
                        <li key={comment.id} className="comment-item">
                            <div className="comment-header">
                                <img src={comment.avatar} alt={`${comment.fullName}'s avatar`} className="avatar" />
                                <span className="fullName">{comment.fullName}</span>
                                <span className="cmtDate">, {comment.cmtDate}</span>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                            <button
                                className="reply-button"
                                onClick={() => this.setState({ replyingTo: comment.id })}
                            >
                                Trả lời
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => this.handleDeleteComment(comment.id)}
                            >
                                Xóa
                            </button>

                            {this.state.replyingTo === comment.id && (
                                <div className="reply-input">
                                    <input
                                        type="text"
                                        placeholder="Nhập câu trả lời ..."
                                        value={this.state.replyText}
                                        onChange={(e) => this.setState({ replyText: e.target.value })}
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' && this.handleAddReply(comment.id)
                                        }
                                    />
                                    <button onClick={() => this.handleAddReply(comment.id)}>
                                        Gửi
                                    </button>
                                </div>
                            )}

                            {comment.replies.length > 0 && (
                                <ul className="reply-list">{this.renderReplies(comment.replies, comment.id)}</ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
        exam: state.user.selectedExam
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BinhLuan);