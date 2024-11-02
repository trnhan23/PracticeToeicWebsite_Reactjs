import axios from "../axios"

const saveTestResult = (data) => {
    return axios.post('/api/save-test-result', data);
}

const getTestResult = (examId, userId) => {
    return axios.get('/api/get-test-result', {
        params: { examId, userId }
    });
}

export {
    saveTestResult,
    getTestResult,

}
