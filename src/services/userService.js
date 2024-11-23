import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get('/api/get-all-users', {
        params: {
            id: inputId
        }
    })
}

const createNewUserService = (data) => {
    return axios.post('/api/create-user', data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCode = (type) => {
    return axios.get('/api/allcode', {
        params: { type }
    })
}

const verifyEmailAccount = (data) => {
    return axios.post('/api/verify-account-user', data);
}

const sendCode = (data) => {
    return axios.post('/api/send-code', data);
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCode,
    verifyEmailAccount,
    sendCode,

}
