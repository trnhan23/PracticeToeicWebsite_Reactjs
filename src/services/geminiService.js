import axios from "../axios"

const createSituationApi = (topic) => {
    return axios.post('/api/gemini-situation', {
        topic: topic
    }, {
        headers: { "Content-Type": "application/json" }
    });
}

export {
    createSituationApi,

}