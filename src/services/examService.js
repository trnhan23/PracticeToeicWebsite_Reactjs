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

export {
    getAllExams,
    get8LatestExams,

}
