import React from "react";
import "./Modal.scss";

const DetailModal = ({ isOpen, onClose, message }) => {
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
                                <p>
                                    <img
                                        className="option-icon"
                                        src="https://img.lovepik.com/png/20231005/Cartoon-speaker-player-Volume-Icon-speaker-icons-loudspeaker-players_83590_wh860.png"
                                        alt="Loudspeaker"

                                    />
                                    <strong>Bạn nói:</strong>


                                </p>
                                <p className="textmessage"> {message.text}</p>
                                <p className="suggestion">
                                    <img
                                        className="option-icon"
                                        src="https://img.lovepik.com/png/20231005/Cartoon-speaker-player-Volume-Icon-speaker-icons-loudspeaker-players_83590_wh860.png"
                                        alt="Loudspeaker"

                                    />
                                    <strong>Đề xuất khác:</strong>

                                </p>
                                <span className="highlight"> {message.suggestion || "Không có"}</span>
                            </div>
                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div className="progress" style={{ width: `${message.score || 70}%` }}></div>
                                </div>
                                <span className="progress-text">{message.score || 70}%</span>
                            </div>
                        </div>

                    </div>





                    <div className="feedback">
                        <p><strong>Ngữ cảnh:</strong> </p>
                        <p>{message.context || "Chưa có"}</p>
                        <p><strong>Ngữ pháp:</strong></p>
                        <p> {message.grammar || "Chưa có"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
