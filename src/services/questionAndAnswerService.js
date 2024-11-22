import axios from "../axios"

const importFileExam = (data) => {
    return axios.post('/api/import-exam', data);
}

export {
    importFileExam,

}
