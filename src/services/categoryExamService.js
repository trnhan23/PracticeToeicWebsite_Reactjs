import axios from "../axios"

const getAllCategoryExams = (inputId) => {
    return axios.get('/api/get-all-category-exam', {
        params: {
            id: inputId
        }
    })
}

export {
    getAllCategoryExams,

}
