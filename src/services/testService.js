import axios from "../axios"

const saveTestResult = (data) => {
    return axios.post('/api/save-test-result', data);
}


export {
    saveTestResult,

}
