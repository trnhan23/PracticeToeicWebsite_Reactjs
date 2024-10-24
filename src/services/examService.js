import axios from "../axios"

const getAllExams = (cateExamId, userId, page) => {
    return axios.get('/api/get-all-exam', {
        params: {
            userId: userId,
            cateExamId: cateExamId,
            page: page
        }
    })
}

const get8LatestExams = () => {
    return axios.get('/api/get-latest-exam');
}

const createExam = (data) => {
    return axios.post('/api/create-exam', data);
}

const practiceExam = (examId, questionType) => {
    return axios.get('/api/get-practice-exam', {
        params: { examId, questionType }
    })
}

export {
    getAllExams,
    get8LatestExams,
    createExam,
    practiceExam,

}
