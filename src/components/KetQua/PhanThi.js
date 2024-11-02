import React, { useState, useEffect } from 'react';
import './PhanThi.scss';
import { setSelectedParts, setSelectedTime } from '../../store/actions';
import { path } from '../../utils';
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import { getAllCode } from '../../services/userService';

const getTime = async () => {
    try {
        let res = await getAllCode('TIME');
        const formattedData = res.data.map(item => ({
            value: item.keyMap,
            label: item.value
        }));
        return formattedData;
    } catch (error) {
        console.error("Error fetching TIME data:", error);
        return [];
    }
};


const PhanThi = ({ setSelectedParts, navigate, setSelectedTime }) => {
    const [activeTab, setActiveTab] = useState('luyenTap');
    const [selectedParts, setSelectedPartsState] = useState([]);
    const [timeLimit, setTimeLimit] = useState('');
    const [timeOptions, setTimeOptions] = useState([]);

    const parts = [
        { id: 'Part 1', label: 'Part 1 (6 câu hỏi)' },
        { id: 'Part 2', label: 'Part 2 (25 câu hỏi)' },
        { id: 'Part 3', label: 'Part 3 (39 câu hỏi)' },
        { id: 'Part 4', label: 'Part 4 (30 câu hỏi)' },
        { id: 'Part 5', label: 'Part 5 (30 câu hỏi)' },
        { id: 'Part 6', label: 'Part 6 (16 câu hỏi)' },
        { id: 'Part 7', label: 'Part 7 (54 câu hỏi)' },
    ];

    useEffect(() => {
        const fetchTimeOptions = async () => {
            const data = await getTime();
            setTimeOptions(data);
        };
        fetchTimeOptions();
    }, []);


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
        const parts = selectedParts && selectedParts.length > 0 ? selectedParts : ['Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7'];
        setSelectedParts(parts);
        setSelectedTime(timeLimit);
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
                    <div className='wrapper'>
                        <select
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(Number(e.target.value))}
                            className="time-select"
                        >
                            <option value="">--Chọn thời gian--</option>
                            {timeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
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
        setSelectedParts: (exam) => dispatch(setSelectedParts(exam)),
        setSelectedTime: (time) => dispatch(setSelectedTime(time)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhanThi);
