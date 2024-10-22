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

const deleteComment = (commentId, currentId) => {
    return axios.delete('/api/delete-comment', {
        data: {
            commentId: commentId,
            currentId: currentId
        }
    });
}

export {
    getComments,
    createComment,
    deleteComment,

}