import axios from "../axios"

const importFileExam = (data) => {
    console.log("Kiểm tra dữ liệu trong service importFileExam: ", data);
    return axios.post('/api/import-exam', data);
}

export {
    importFileExam,

}
