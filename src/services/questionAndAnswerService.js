import axios from "../axios"

const importFileQuestionAndAnswer = (data) => {
    return axios.post('/api/create-question-and-answer', data);
}

const importFileExam = (data) => {
    console.log("Kiểm tra dữ liệu trong service importFileExam: ", data);
    return axios.post('/api/import-exam', data);
}

export {
    importFileQuestionAndAnswer,
    importFileExam,

}
