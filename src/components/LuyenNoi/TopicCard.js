import React, { useState } from "react";
import "./TopicCard.scss";

const TopicCard = ({ topics, onSelectTopic }) => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleSelect = (id) => {
        setSelectedTopic(id);
        if (onSelectTopic) {
            onSelectTopic(id);
        }
    };

    return (
        <div className="topic-container">
            {topics.map((topic) => (
                <div
                    key={topic.id}
                    className={`topic-card ${selectedTopic === topic.id ? "selected" : ""}`}
                    onClick={() => handleSelect(topic.id)}
                >
                    <img src={topic.image} alt={topic.title} className="topic-image" />
                    <div className="topic-label">{topic.title}</div>
                </div>
            ))}
        </div>
    );
};

export default TopicCard;
