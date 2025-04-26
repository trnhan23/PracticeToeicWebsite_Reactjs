import React, { useState } from "react";
import ChatBox from "./ChatBox";
import "./ChatWidget.scss";
import logo from "../../../assets/logo.png";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleOpen = () => {
        setIsOpen(!isOpen);
        if (isOpen == true) {
            console.log("Chat widget opened");
        } else {
            console.log("Chat widget closed");
        }
    }

    return (
        <>
            {isOpen && (
                <div className="chatbox-container">
                    <div className="chatbox-header">
                        <img className="avatar" src={logo} alt="Bot" />
                        <span className="text-chatbox">Chat hỗ trợ</span>
                        <button className="close-icon" onClick={handleOpen}>
                            {/* X icon (SVG) */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <ChatBox />
                </div>
            )}

            <button className="chat-button" onClick={handleOpen}>
                <img className="avatar" src={logo} alt="Bot" />
            </button>
        </>
    );
};

export default ChatWidget;
