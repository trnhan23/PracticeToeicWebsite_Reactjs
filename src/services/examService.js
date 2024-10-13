import axios from "../axios"

const getAllExams = (examId, cateExamId, page) => {
    return axios.get('/api/get-all-exam', {
        params: {
            examId: examId,
            cateExamId: cateExamId,
            page: page
        }
    })
}

const get8LatestExams = () => {
    return axios.get('/api/get-latest-exam');
}

export {
    getAllExams,
    get8LatestExams,

}
