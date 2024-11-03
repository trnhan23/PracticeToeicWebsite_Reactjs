import React from "react";

const AnswerDetails = ({ questionNumber, status, correctAnswer }) => {
    return (
        <div className="question">
            <span>{questionNumber}:</span>
            <span className="answer-status">
                {correctAnswer} - {status}
            </span>
            <button>View Details</button>
        </div>
    );
};

export default AnswerDetails;
