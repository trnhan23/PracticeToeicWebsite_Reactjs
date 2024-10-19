import React, { useState } from 'react';
import './BinhLuan.scss';

const BinhLuan = () => {
    const [comments, setComments] = useState([
        {
            id: 1,
            username: 'hoainbzz.2004',
            avatar: 'https://i.pravatar.cc/300?img=2',
            date: 'July 06, 2024',
            text: 'ai giải thích hộ mình câu 30 part 2 là sao z được không ạ',
            replies: [
                {
                    id: 2,
                    username: 'NguyenDng_71297',
                    avatar: 'https://i.pravatar.cc/300?img=2',
                    date: 'July 07, 2024',
                    text: 'câu c chúng ta có cùng 1 cái máy tính trong 5 năm, ý là muốn dùng số tiền thừa đó để mua cái mới đó ạ',
                    replies: [
                        {
                            id: 3,
                            username: 'dienpguynenz',
                            avatar: 'https://i.pravatar.cc/300?img=2',
                            date: 'May 11, 2024',
                            text: 'Mn cho mình hỏi aim 750 thì part 5 cần đúng khoảng bnh câu ạ? mình cảm ơn.',
                            replies: [],
                        },
                    ],
                },
            ],
        },
        {
            id: 4,
            username: 'NguyenDng_71297',
            avatar: 'https://i.pravatar.cc/300?img=2',
            date: 'July 07, 2024',
            text: 'câu c chúng ta có cùng 1 cái máy tính trong 5 năm, ý là muốn dùng số tiền thừa đó để mua cái mới đó ạ',
            replies: [],
        },
    ]);

    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyingToReply, setReplyingToReply] = useState(null);

    // Thêm bình luận mới
    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        const newCommentData = {
            id: comments.length + 1,
            username: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            date: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
            text: newComment.trim(),
            replies: [],
        };
        setComments([newCommentData, ...comments]);
        setNewComment('');
    };

    // Thêm bình luận con (reply)
    const handleAddReply = (parentId) => {
        if (replyText.trim() === '') return;
        const newReply = {
            id: Math.random(),
            username: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            date: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
            text: replyText.trim(),
            replies: [],
        };

        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === parentId
                    ? { ...comment, replies: [...comment.replies, newReply] }
                    : comment
            )
        );
        setReplyText('');
        setReplyingTo(null);
        setReplyingToReply(null);
    };

    const handleAddReplyToReply = (parentId) => {
        if (replyText.trim() === '') return;
        const newReply = {
            id: Math.random(),
            username: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            date: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
            text: replyText.trim(),
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

        setComments((prevComments) => addReplyToComment(prevComments));
        setReplyText('');
        setReplyingToReply(null);
    };

    // Xóa bình luận hoặc bình luận con
    const handleDeleteComment = (commentId) => {
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
        );
    };

    const handleDeleteReply = (commentId, replyId) => {
        const deleteReply = (comments) => {
            return comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: comment.replies.filter((reply) => reply.id !== replyId),
                    };
                } else if (comment.replies.length > 0) {
                    return { ...comment, replies: deleteReply(comment.replies) };
                }
                return comment;
            });
        };

        setComments((prevComments) => deleteReply(prevComments));
    };

    // Render các reply con
    const renderReplies = (replies, parentId) =>
        replies.map((reply) => (
            <li key={reply.id} className="comment-item reply">
                <div className="comment-header">
                    <img src={reply.avatar} alt={`${reply.username}'s avatar`} className="avatar" />
                    <span className="username">{reply.username}</span>
                    <span className="date">, {reply.date}</span>
                </div>
                <p className="comment-text">{reply.text}</p>
                <button
                    className="reply-button"
                    onClick={() => setReplyingToReply(reply.id)}
                >
                    Trả lời
                </button>
                <button
                    className="delete-button"
                    onClick={() => handleDeleteReply(parentId, reply.id)}
                >
                    Xóa
                </button>

                {replyingToReply === reply.id && (
                    <div className="reply-input">
                        <input
                            type="text"
                            placeholder="Nhập câu trả lời ..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleAddReplyToReply(reply.id)
                            }
                        />
                        <button onClick={() => handleAddReplyToReply(reply.id)}>
                            Gửi
                        </button>
                    </div>
                )}

                {reply.replies.length > 0 && (
                    <ul className="reply-list">{renderReplies(reply.replies, reply.id)}</ul>
                )}
            </li>
        ));

    return (
        <div className="binh-luan-container">
            <h3>Bình luận</h3>
            <div className="comment-input">
                <input
                    type="text"
                    placeholder="Chia sẻ cảm nghĩ của bạn ..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button onClick={handleAddComment}>Gửi</button>
            </div>
            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment-header">
                            <img src={comment.avatar} alt={`${comment.username}'s avatar`} className="avatar" />
                            <span className="username">{comment.username}</span>
                            <span className="date">, {comment.date}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <button
                            className="reply-button"
                            onClick={() => setReplyingTo(comment.id)}
                        >
                            Trả lời
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => handleDeleteComment(comment.id)}
                        >
                            Xóa
                        </button>

                        {replyingTo === comment.id && (
                            <div className="reply-input">
                                <input
                                    type="text"
                                    placeholder="Nhập câu trả lời ..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleAddReply(comment.id)
                                    }
                                />
                                <button onClick={() => handleAddReply(comment.id)}>
                                    Gửi
                                </button>
                            </div>
                        )}

                        {comment.replies.length > 0 && (
                            <ul className="reply-list">{renderReplies(comment.replies, comment.id)}</ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BinhLuan;
