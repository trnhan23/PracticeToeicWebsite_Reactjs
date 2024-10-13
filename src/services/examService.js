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

export {
    getAllExams,

}
