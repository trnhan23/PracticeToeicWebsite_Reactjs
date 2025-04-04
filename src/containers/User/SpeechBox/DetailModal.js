import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.scss";

const DetailModal = ({ isOpen, onClose, message, question }) => {
    const [judgment, setJudgment] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && message) {
            judgeAnswer(question, message.text);
        }
    }, [isOpen, message]);

    const judgeAnswer = async (question, answer) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:9090/api/gemini-judge-answer", {
                question,
                answer
            }, {
                headers: { "Content-Type": "application/json" }
            });

            setJudgment(response.data);
        } catch (error) {
            console.error("Error calling API:", error);
            setJudgment({ error: "Không thể đánh giá câu trả lời." });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !message) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">Chi tiết</h2>

                <div className="modal-body">
                    <div className="avatar11">
                        <img className="avatar1" src="https://cdn-icons-png.flaticon.com/512/4128/4128176.png" alt="Avatar" />
                        <div>
                            <div className="message-box">
                                <p><strong>Bạn nói:</strong></p>
                                <p className="textmessage">{message.text}</p>

                                <p className="suggestion"><strong>Đề xuất khác:</strong></p>
                                <span className="highlight">{judgment?.hasAlternativeAnswer || "Không có"}</span>
                            </div>

                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div className="progress" style={{ width: `${judgment?.score || 70}%` }}></div>
                                </div>
                                <span className="progress-text">{judgment?.score || 70}%</span>
                            </div>

                            <div className="feedback">
                                <p><strong>Ngữ cảnh:</strong> {judgment?.contextCorrect || "Chưa có"}</p>
                                <p><strong>Ngữ pháp:</strong> {judgment?.grammarCorrect || "Chưa có"}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
