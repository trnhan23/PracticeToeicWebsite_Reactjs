import React, { useState, useEffect } from 'react';
import './BinhLuan.scss';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { getComments, createComment, deleteComment } from '../../services/commentService';

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
        handleGetComments();
    }, []);

    const handleGetComments = async () => {
        try {
            const res = await getComments(exam.id, userInfor.id);
            const normalizedComments = normalizeComments(res);
            setComments(normalizedComments);
        } catch (error) {
            console.error("Error fetching comments: ", error);
        } finally {
            setLoading(false);
        }
    };

    const normalizeComments = (commentsData) => {
        const commentsMap = {};
        const rootComments = [];
    
        commentsData.forEach(comment => {
            const formattedDate = comment.cmtDate
                ? new Date(comment.cmtDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
                : 'Chưa có ngày';
    
            commentsMap[comment.id] = {
                id: comment.id,
                fullName: comment.comment_UserData?.fullName || 'Người dùng ẩn danh',
                avatar: comment.comment_UserData?.avatar || 'https://via.placeholder.com/40',
                cmtDate: formattedDate,
                text: comment.contentComment || 'Nội dung không có sẵn',
                userId: comment.userId,
                replies: [],
            };
        });
    
        commentsData.forEach(comment => {
            if (comment.parentCmtId === null) {
                rootComments.push(commentsMap[comment.id]);
            } else {
                const parentComment = commentsMap[comment.parentCmtId];
                if (parentComment) {
                    parentComment.replies.push(commentsMap[comment.id]);
                }
            }
        });
    
        return rootComments;
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        const commentData = {
            examId: exam.id,
            userId: userInfor.id,
            parentCmtId: null,
            contentComment: newComment.trim(),
        };

        try {
            await createComment(commentData);
            await handleGetComments();
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const handleAddReply = async (parentId) => {
        if (replyText.trim() === '') return;

        const replyData = {
            examId: exam.id,
            userId: userInfor.id,
            parentCmtId: parentId,
            contentComment: replyText.trim(),
        };

        try {
            await createComment(replyData);
            await handleGetComments();
            setReplyText('');
            setReplyingTo(null);
        } catch (error) {
            console.error("Error adding reply: ", error);
        }
    };

    const handleAddReplyToReply = async (parentId) => {
        if (replyText.trim() === '') return;

        const replyData = {
            examId: exam.id,
            userId: userInfor.id,
            parentCmtId: parentId,
            contentComment: replyText.trim(),
        };

        try {
            await createComment(replyData);
            await handleGetComments();
            setReplyText('');
            setReplyingToReply(null);
        } catch (error) {
            console.error("Error adding reply to reply: ", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId, userInfor.id);
            await handleGetComments(); // Refresh comments after deletion
        } catch (error) {
            console.error("Error deleting comment: ", error);
        }
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
                {userInfor.id === reply.userId && (
                            <button className="delete-button" onClick={() => handleDeleteComment(reply.id)}>Xoá</button>
                        )}

                {replyingToReply === reply.id && (
                    <div className="reply-input">
                        <input
                            type="text"
                            placeholder="Phản hồi ..."
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
                        {userInfor.id === comment.userId && (
                            <button className="delete-button" onClick={() => handleDeleteComment(comment.id)}>Xoá</button>
                        )}

                        {replyingTo === comment.id && (
                            <div className="reply-input">
                                <input
                                    type="text"
                                    placeholder="Phản hồi ..."
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
