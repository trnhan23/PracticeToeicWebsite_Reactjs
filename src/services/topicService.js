import axios from "../axios";

const getAllTopics = (id) => {
    return axios.get('/api/get-topics', {
        params: { id }
    });
};

const deleteTopic = (id) => {
    return axios.delete('/api/delete-topic', {
        data: { id }
    });
};

const createTopic = (title, file) => {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    return axios.post('/api/create-topic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

const updateTopic = (id, title, file) => {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    if (file) {
        formData.append('file', file);
    }

    return axios.put('/api/update-topic', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export {
    getAllTopics,
    deleteTopic,
    createTopic,
    updateTopic
}
