import axios from "../axios"

const getComments = async (examId, userId) => {
    return axios.get('/api/get-comment', {
        params: {
            examId: examId,
            userId: userId
        }
    })
};


const createComment = (data) => {
    return axios.post('/api/create-comment', data);
}

export {
    getComments,
    createComment,

}