import axios from "../axios"

const handleGetGeminiApi = (prompt) => {
    return axios.post('/api/gemini-chatbox', {
        prompt: prompt
    }, {
        headers: { "Content-Type": "application/json" }
    });
}
const createSituationApi = (topic) => {
    return axios.post('/api/gemini-situation', {
        topic: topic
    }, {
        headers: { "Content-Type": "application/json" }
    });
}

const createQuestionOrAnswerApi = (text) => {
    return axios.post('/api/gemini-questionandanswer', {
        text: text
    }, {
        headers: { "Content-Type": "application/json" }
    });
}
const createQuestionOrAnswerApi1 = (text, situation, question) => {
    return axios.post('/api/gemini-questionandanswer1', {
        text: text,
        situation: situation,
        question: question
    }, {
        headers: { "Content-Type": "application/json" }
    });
}


export {
    createSituationApi,
    createQuestionOrAnswerApi,
    createQuestionOrAnswerApi1,
    handleGetGeminiApi,

}