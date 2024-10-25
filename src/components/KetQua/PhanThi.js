import React, { useState } from 'react';
import './PhanThi.scss';
import { setSelectedParts } from '../../store/actions';
import { path } from '../../utils';
import { push } from "connected-react-router";
import { connect } from 'react-redux';

const PhanThi = ({ setSelectedParts, navigate }) => {
    const [activeTab, setActiveTab] = useState('luyenTap');
    const [selectedParts, setSelectedPartsState] = useState([]);
    const [timeLimit, setTimeLimit] = useState('');
    const parts = [
        { id: 'Part 1', label: 'Part 1 (6 câu hỏi)' },
        { id: 'Part 2', label: 'Part 2 (25 câu hỏi)' },
        { id: 'Part 3', label: 'Part 3 (39 câu hỏi)' },
        { id: 'Part 4', label: 'Part 4 (30 câu hỏi)' },
        { id: 'Part 5', label: 'Part 5 (30 câu hỏi)' },
        { id: 'Part 6', label: 'Part 6 (16 câu hỏi)' },
        { id: 'Part 7', label: 'Part 7 (54 câu hỏi)' },
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePartChange = (event) => {
        const { id, checked } = event.target;
        setSelectedPartsState((prev) =>
            checked ? [...prev, id] : prev.filter((part) => part !== id)
        );
    };

    const handleSubmit = () => {
        console.log('Giới hạn thời gian:', timeLimit);
        const parts = selectedParts && selectedParts.length > 0 ? selectedParts : ['Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7'];
        console.log('Phần thi đã chọn:', parts);
        setSelectedParts(parts);
        navigate(path.PRACTICE);
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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        setSelectedParts: (exam) => dispatch(setSelectedParts(exam))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhanThi);
