import axios from "../axios"

const getAllExams = (examId, cateExamId) => {
    return axios.get('/api/get-all-exam', {
        params: {
            examId: examId,
            cateExamId: cateExamId
        }
    })
}

export {
    getAllExams,

}
