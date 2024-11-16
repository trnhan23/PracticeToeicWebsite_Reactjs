import axios from "../axios";

// const uploadFile = (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     return axios.post('/api/upload', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
// }

const uploadFile = async (formData) => {
    return await axios.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Đảm bảo header này được thiết lập đúng
        },
    });
};

export {
    uploadFile,
}
