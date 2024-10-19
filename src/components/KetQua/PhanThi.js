import React, { useState } from 'react';
import './PhanThi.scss';

const PhanThi = () => {
    const [activeTab, setActiveTab] = useState('luyenTap');
    const [selectedParts, setSelectedParts] = useState([]);
    const [timeLimit, setTimeLimit] = useState('');

    const parts = [
        { id: 'part1', label: 'Part 1 (6 câu hỏi)' },
        { id: 'part2', label: 'Part 2 (25 câu hỏi)' },
        { id: 'part3', label: 'Part 3 (39 câu hỏi)' },
        { id: 'part4', label: 'Part 4 (30 câu hỏi)' },
        { id: 'part5', label: 'Part 5 (30 câu hỏi)' },
        { id: 'part6', label: 'Part 6 (16 câu hỏi)' },
        { id: 'part7', label: 'Part 7 (54 câu hỏi)' },
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePartChange = (event) => {
        const { id, checked } = event.target;
        setSelectedParts((prev) =>
            checked ? [...prev, id] : prev.filter((part) => part !== id)
        );
    };

    const handleSubmit = () => {
        console.log('Phần thi đã chọn:', selectedParts);
        console.log('Giới hạn thời gian:', timeLimit);
    };

    return (
        <div className="chon-phan-thi-container">
            <div className="tab-bar">
                <div className='tab-bar-detail'>
                    <button
                        className={`tab ${activeTab === 'luyenTap' ? 'active' : ''}`}
                        onClick={() => handleTabChange('luyenTap')}
                    >
                        Luyện tập
                    </button>
                    <button
                        className={`tab ${activeTab === 'fullTest' ? 'active' : ''}`}
                        onClick={() => handleTabChange('fullTest')}
                    >
                        Làm full test
                    </button>
                </div>
            </div>

            {activeTab === 'luyenTap' && (
                <div className="chon-phan-thi-content">
                    <h4>Chọn phần thi bạn muốn làm</h4>
                    <div className="checkbox-group">
                        {parts.map((part) => (
                            <label key={part.id} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    id={part.id}
                                    onChange={handlePartChange}
                                />
                                {part.label}
                            </label>
                        ))}
                    </div>

                    <h4>Giới hạn thời gian (Để trống để làm bài không giới hạn)</h4>
                    <select
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e.target.value)}
                        className="time-select"
                    >
                        <option value="">--Chọn thời gian--</option>
                        <option value="15">15 phút</option>
                        <option value="30">30 phút</option>
                        <option value="45">45 phút</option>
                        <option value="60">60 phút</option>
                        <option value="90">90 phút</option>
                    </select>
                </div>
            )}

            <button className="btn-submit" onClick={handleSubmit}>
                LUYỆN TẬP
            </button>
        </div>
    );
};

export default PhanThi;
