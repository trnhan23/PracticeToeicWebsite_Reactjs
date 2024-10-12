import axios from "../axios"

const getAllExams = (inputId) => {
    return axios.get('/api/get-all-exam', {
        params: {
            id: inputId
        }
    })
}

export {
    getAllExams,

}
