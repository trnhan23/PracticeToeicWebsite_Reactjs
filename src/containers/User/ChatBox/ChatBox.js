import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./ChatBox.scss";
import { handleGetGeminiApi } from "../../../services/geminiService";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
const ChatBox = ({ resetTrigger }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const messageEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem("persist:user"));
        setUserInfo(JSON.parse(storedUserInfo.userInfor));

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

        await fetchAIResponse(input.trim());
    };

    const fetchAIResponse = async (userInput) => {
        const response = await handleGetGeminiApi(userInput);
        console.log(response);

        if (!response || response.errCode !== 0) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
            return;
        }

        const aiMessage = {
            id: Date.now() + 1,
            sender: "AI",
            text: `${response.response}`,
        };

        const updatedMessages = [
            ...messages,
            {
                id: Date.now(),
                sender: "Bạn",
                text: userInput,
            },
            aiMessage,
        ];

        setMessages(updatedMessages);
        saveMessagesToStorage(updatedMessages);
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
                        <div key={msg.id} className={`chatbox-message-wrapper ${msg.sender === "AI" ? "ai" : "user"}`}>
                            {msg.sender === "AI" && (
                                <div className="chatbox-avatar">
                                    <img className="avatar" src={logo} alt="AI" />
                                </div>
                            )}
                            <div className={`chatbox-message ${msg.sender === "AI" ? "ai" : "user"}`}>
                                {msg.sender === "AI" ? (
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                ) : (
                                    <span>{msg.text}</span>
                                )}
                            </div>
                            {msg.sender !== "AI" && (
                                <div className="chatbox-avatar">
                                    <img className="avatar" src={userInfo !== null ? userInfo.avatar : logo} alt="User" />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="chatbox-empty">Bạn cần giúp gì?</div>
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
