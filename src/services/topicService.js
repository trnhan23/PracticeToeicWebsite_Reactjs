import axios from "../axios"



const getAllTopics = (inputId) => {
    return axios.get('/api/get-all-topics', {
        params: {
            id: inputId
        }
    })
}

const createNewTopic = (data) => {
    return axios.post('/api/create-topic', data);
}

const deleteTopicService = (topicId) => {
    return axios.delete('/api/delete-topic', {
        data: {
            id: topicId
        }
    });
}

const editTopicService = (inputData) => {
    return axios.put('/api/edit-topic', inputData);
}


export {
    getAllTopics,
    createNewTopic,
    deleteTopicService,
    editTopicService

}
