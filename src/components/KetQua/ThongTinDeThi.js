import React, { useState } from 'react';
import './ThongTinDeThi.scss';

const ThongTinDeThi = () => {
    const [activeButton, setActiveButton] = useState('info'); // Theo dõi nút đang được bấm

    return (
        <div className="test-info-container">
            <h2 className="test-title">TOEIC TEST 2</h2>
            <div className="test-actions">
                <button
                    className={`test-action-button ${activeButton === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveButton('info')}
                >
                    Thông tin đề thi
                </button>
                <button
                    className={`test-action-button ${activeButton === 'transcript' ? 'active' : ''}`}
                    onClick={() => setActiveButton('transcript')}
                >
                    Đáp án / Transcript
                </button>
            </div>
            <div className="test-details">
                <span className="test-time">
                    <i className="far fa-clock"></i>
                    <p>Thời gian làm bài:</p>
                    <p>120 phút  |</p>
                    <p>7 phần thi  |</p>
                    <p> 200 câu hỏi |</p>
                    <p>46 bình luận</p>
                </span>
            </div>
            <div className="test-participation">
                <span className="test-participant-info">
                    <i className="far fa-user"></i>
                    146688 người đã luyện tập đề thi này
                </span>
            </div>
        </div>
    );
};

export default ThongTinDeThi;
