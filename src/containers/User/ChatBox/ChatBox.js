import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.scss";

const ChatBox = ({resetTrigger}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messageEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const storedMessages = localStorage.getItem("chatMessages");
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
            setMessages([]);
        }
    }, [resetTrigger]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const saveMessagesToStorage = (newMessages) => {
        localStorage.setItem("chatMessages", JSON.stringify(newMessages));
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: "Bạn",
            text: input.trim(),
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        saveMessagesToStorage(updatedMessages);
        setInput("");

        if (inputRef.current) {
            inputRef.current.style.height = "auto";
        }

        // Giả lập gọi API nhận tin từ AI
        await fetchAIResponse(input.trim());
    };

    const fetchAIResponse = async (userInput) => {
        // Giả lập API bằng timeout
        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                sender: "AI",
                text: `Đây là phản hồi từ AI cho: "${userInput}"`, // sau này chỉ cần gắn data trả về từ API
            };

            const updatedMessages = [...messages, {
                id: Date.now(),
                sender: "Bạn",
                text: userInput,
            }, aiMessage];

            setMessages(updatedMessages);
            saveMessagesToStorage(updatedMessages);
        }, 1000); // giả lập chờ 1 giây
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chatbox">
            <div className="chatbox-messages">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} className={`chatbox-message ${msg.sender === "AI" ? "ai" : "user"}`}>
                            <strong>{msg.sender}:</strong> {msg.text}
                        </div>
                    ))
                ) : (
                    <div className="chatbox-empty">
                        Bạn cần giúp gì?
                    </div>
                )}
                <div ref={messageEndRef} />
            </div>
            <div className="chatbox-input-area">
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn..."
                    className="chatbox-input"
                    rows={1}
                />
                <button onClick={sendMessage} className="chatbox-send-btn">
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
