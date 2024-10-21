import React, { useState, useEffect } from 'react';
import './BinhLuan.scss';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { getComments, createComment } from '../../services/commentService';

const BinhLuan = () => {
    const dispatch = useDispatch();
    const userInfor = useSelector(state => state.user.userInfor);
    const exam = useSelector(state => state.user.selectedExam);

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyingToReply, setReplyingToReply] = useState(null);

    useEffect(() => {
        setLoading(false);
        handleGetComments();
    }, []);

    const handleGetComments = async () => {
        try {
            const res = await getComments(exam.id, userInfor.id);
            const normalizedComments = normalizeComments(res);
            setComments(normalizedComments);
        } catch (error) {
            console.error("Error fetching comments: ", error);
        }
    };

    const normalizeComments = (commentsData) => {
        const commentsMap = {};
        commentsData.forEach(comment => {
            const { id, userId, contentComment, cmtDate, parentCmtId, comment_UserData } = comment;
            const formattedDate = new Date(cmtDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            const normalizedComment = {
                id: id,
                fullName: comment_UserData.fullName,
                avatar: comment_UserData.avatar,
                cmtDate: formattedDate,
                text: contentComment,
                replies: [],
            };

            commentsMap[id] = normalizedComment;

            if (parentCmtId) {
                if (!commentsMap[parentCmtId]) {
                    commentsMap[parentCmtId] = { replies: [] };
                }
                commentsMap[parentCmtId].replies.push(normalizedComment);
            }
        });
        return Object.values(commentsMap).filter(comment => !comment.parentCmtId);
    };

    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        const newCommentData = {
            id: comments.length + 1,
            fullName: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            cmtDate: new Date().toLocaleDateString('en-US', {
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

    const handleAddReply = (parentId) => {
        if (replyText.trim() === '') return;

        const newReply = {
            id: Math.random(),
            fullName: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            cmtDate: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),
            text: replyText.trim(),
            replies: [],
        };

        setComments(prevComments =>
            prevComments.map(comment =>
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
            fullName: 'Người dùng mới',
            avatar: 'https://via.placeholder.com/40',
            cmtDate: new Date().toLocaleDateString('en-US', {
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

        setComments(addReplyToComment(comments));
        setReplyText('');
        setReplyingToReply(null);
    };

    const handleDeleteComment = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const handleDeleteReply = (commentId, replyId) => {
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

        setComments(deleteReply(comments));
    };

    const renderReplies = (replies, parentId) => {
        return replies.map(reply => (
            <li key={reply.id} className="comment-item reply">
                <div className="comment-header">
                    <img src={reply.avatar} alt={`${reply.fullName}'s avatar`} className="avatar" />
                    <span className="fullName">{reply.fullName}</span>
                    <span className="cmtDate">, {reply.cmtDate}</span>
                </div>
                <p className="comment-text">{reply.text}</p>
                <button className="reply-button" onClick={() => setReplyingToReply(reply.id)}>Trả lời</button>
                <button className="delete-button" onClick={() => handleDeleteReply(parentId, reply.id)}>Xóa</button>

                {replyingToReply === reply.id && (
                    <div className="reply-input">
                        <input
                            type="text"
                            placeholder="Nhập câu trả lời ..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddReplyToReply(reply.id)}
                        />
                        <button onClick={() => handleAddReplyToReply(reply.id)}>Gửi</button>
                    </div>
                )}

                {reply.replies.length > 0 && (
                    <ul className="reply-list">{renderReplies(reply.replies, reply.id)}</ul>
                )}
            </li>
        ));
    };

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
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button onClick={handleAddComment}>Gửi</button>
            </div>
            <ul className="comment-list">
                {comments.map(comment => (
                    <li key={comment.id} className="comment-item">
                        <div className="comment-header">
                            <img src={comment.avatar} alt={`${comment.fullName}'s avatar`} className="avatar" />
                            <span className="username">{comment.fullName}</span>
                            <span className="date">, {comment.cmtDate}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <button className="reply-button" onClick={() => setReplyingTo(comment.id)}>Trả lời</button>
                        <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>Xóa</button>

                        {replyingTo === comment.id && (
                            <div className="reply-input">
                                <input
                                    type="text"
                                    placeholder="Nhập câu trả lời ..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddReply(comment.id)}
                                />
                                <button onClick={() => handleAddReply(comment.id)}>Gửi</button>
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
