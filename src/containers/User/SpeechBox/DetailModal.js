import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.scss";

const DetailModal = ({ isOpen, onClose, message, avatar, situation, question }) => {
    const [judgment, setJudgment] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && message) {
            judgeAnswer(question, message.text);
        }
    }, [isOpen, message]);

    const judgeAnswer = async (question, answer) => {
        setLoading(true);
        console.log("Question:", question);
        console.log("Answer:", answer);
        try {
            // Gửi yêu cầu đến cả hai API đồng thời
            const [responseJudge, responseFluent] = await Promise.all([
                axios.post("http://localhost:9090/api/gemini-judge-answer", {
                    situation,
                    question,
                    answer
                }, {
                    headers: { "Content-Type": "application/json" }
                }),
                axios.post("http://localhost:9090/api/gemini-fluent", {
                    text: message.text
                }, {
                    headers: { "Content-Type": "application/json" }
                })
            ]);

            console.log("Response Judge:", responseJudge.data);
            console.log("Response Fluent:", responseFluent.data);


            // Cập nhật lại state với dữ liệu từ cả hai API
            const { fluencyScore, comment } = responseFluent.data;

            setJudgment({
                ...responseJudge.data,
                fluentCorrect: comment, // Cập nhật comment từ API gemini-fluent
                fluencyScore: fluencyScore, // Cập nhật fluencyScore từ API gemini-fluent
            });
        } catch (error) {
            console.error("Error calling APIs:", error);
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
                        <img className="avatar1" src={avatar} alt="Avatar" />
                        <div className="content-right">
                            <div className="message-box">
                                <strong>Bạn nói:</strong>
                                <p className="textmessage">{message.text}</p>
                                <p className="suggestion"><strong>Đề xuất khác:</strong></p>
                                <span className="highlight">{judgment?.hasAlternativeAnswer || "Không có"}</span>
                            </div>

                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div className="progress" style={{ width: `${judgment?.score || 10}%` }}></div>
                                </div>
                                <span className="progress-text">{judgment?.score || 10}%</span>
                            </div>

                            <div className="feedback">
                                <strong>Ngữ cảnh:</strong>
                                <p className="textmessage">{judgment?.contextCorrect || "Chưa có"}</p>
                                <strong>Ngữ pháp:</strong>
                                <p className="textmessage">{judgment?.grammarCorrect || "Chưa có"}</p>
                                <strong>Độ lưu loát:</strong>
                                <p className="textmessage highlight">{judgment?.fluencyScore || "Chưa có"}/100</p>
                                <p className="textmessage">{judgment?.fluentCorrect || "Chưa có"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
