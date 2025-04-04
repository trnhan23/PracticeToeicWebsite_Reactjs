import axios from "../axios"

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

export {
    createSituationApi,
    createQuestionOrAnswerApi,

}