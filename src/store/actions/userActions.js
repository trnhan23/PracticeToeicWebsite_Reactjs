import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfor) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfor: userInfor
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
})

export const selectExam = (exam) => ({
    type: actionTypes.SELECTED_EXAM,
    payload: exam

});

export const setSelectedParts = (parts) => ({
    type: actionTypes.SELECTED_PARTS,
    payload: parts
});

export const setSelectedTime = (time) => ({
    type: actionTypes.SET_REMAINING_TIME,
    payload: time
})
