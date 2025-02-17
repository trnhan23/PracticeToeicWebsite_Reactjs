import axios from "../axios"

const saveTestResult = (data) => {
    return axios.post('/api/save-test-result', data);
}

const getTestResult = (examId, userId) => {
    return axios.get('/api/get-test-result', {
        params: { examId, userId }
    });
}

const getAllTestResult = (userId) => {
    return axios.get('/api/get-all-test-result', {
        params: { userId }
    });
}

const getDetailTestResult = (testId) => {
    return axios.get('/api/get-detail-test-result', {
        params: { testId }
    })
}

const getTitleExam = (testId) => {
    return axios.get('/api/get-title-exam', {
        params: { testId }
    })
}

const getInfoStatistic = (userId, type) => {
    return axios.get('/api/get-info-statistic', {
        params: { userId, type: "LIS" }
    })
}

export {
    saveTestResult,
    getTestResult,
    getDetailTestResult,
    getAllTestResult,
    getTitleExam,
    getInfoStatistic,
}
