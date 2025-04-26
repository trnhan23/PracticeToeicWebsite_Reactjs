import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.scss";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: "Bạn", text: input }]);
        setInput("");
    };

    return (
        <div className="chatbox">
            <div className="chatbox-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className="chatbox-message">
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
                <div ref={messageEndRef} />

            </div>
            <div className="chatbox-input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="chatbox-input"
                />
                <button onClick={sendMessage} className="chatbox-send-btn">
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
