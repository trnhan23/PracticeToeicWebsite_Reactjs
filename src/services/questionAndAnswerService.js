import axios from "../axios"

const importFileQuestionAndAnswer = (data) => {
    return axios.post('/api/create-question-and-answer', data);
}


export {
    importFileQuestionAndAnswer,

}
