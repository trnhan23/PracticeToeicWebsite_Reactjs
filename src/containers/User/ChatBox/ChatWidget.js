import React, { useState } from "react";
import ChatBox from "./ChatBox";
import "./ChatWidget.scss";
import logo from "../../../assets/logo.png";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleCreateChat = () => {
        localStorage.removeItem("chatMessages");
        setResetTrigger(prev => !prev);
    }


    return (
        <>
            {isOpen && (
                <>
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
                        <ChatBox resetTrigger={resetTrigger}/>
                    </div>

                    <button className="chat-button create-chat" onClick={handleCreateChat}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12C4 7.58172 7.58172 4 12 4V4C16.4183 4 20 7.58172 20 12V17.0909C20 17.9375 20 18.3608 19.8739 18.6989C19.6712 19.2425 19.2425 19.6712 18.6989 19.8739C18.3608 20 17.9375 20 17.0909 20H12C7.58172 20 4 16.4183 4 12V12Z" stroke="#222222" />
                            <path d="M9 11L15 11" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15H15" stroke="#222222" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </>
            )}

            <button className="chat-button" onClick={handleOpen}>
                <img className="avatar" src={logo} alt="Bot" />
            </button>
        </>
    );
};

export default ChatWidget;
