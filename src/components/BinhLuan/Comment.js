import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Comment.scss';

const Comment = () => {
    const [commentText, setCommentText] = useState('');
    const userInfor = useSelector(state => state.user.userInfor);

    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            // Handle comment submission logic here
            console.log('Submitting comment:', commentText);
            setCommentText('');
        }
    };

    const comments = [
        {
            id: 1,
            user: 'hoainbz.2004',
            date: 'July 06, 2024',
            text: 'ai giải thích hộ mình câu 30 part 2 là sao z được không ạ',
        },
        {
            id: 2,
            user: 'NguyenDng_71297',
            date: 'July 07, 2024',
            text: 'câu c chúng ta có cùng 1 cái máy tính trong 5 năm , ý là muốn dùng số tiền thừa đó để mua cái mới đó ạ',
        },
        {
            id: 3,
            user: 'diepnguyencrz',
            date: 'May 11, 2024',
            text: 'Mn cho mình hỏi aim 750 thì part 5 cần đúng khoảng bnh câu ạ? mình cảm ơn.',
        },
        {
            id: 4,
            user: 'tmk7302',
            date: 'July 12, 2024',
            text: '25c',
        },
        {
            id: 5,
            user: 'quangteoak56',
            date: 'May 05, 2024',
            text: 'xin vía 450 để ra trường, ngày 10/05/2024 thi',
        },
    ];

    return (
        <div className="comment-section">
            <h3>Bình luận</h3>
            <div className="comment-input">
                <textarea
                    placeholder="Chia sẻ cảm nghĩ của bạn..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleCommentSubmit}>Gửi</button>
            </div>
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-avatar">
                            <div className="avatar-letter">{comment.user.charAt(0).toUpperCase()}</div>
                        </div>
                        <div className="comment-content">
                            <div className="comment-header">
                                <span className="comment-username">{comment.user}</span>
                                <span className="comment-date">{comment.date}</span>
                            </div>
                            <div className="comment-text">{comment.text}</div>
                            <button className="reply-button">Trả lời</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;
