import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    userInfor: null,
    selectedExam: null,
    selectedParts: null,
    selectedTime: null,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfor: action.userInfor
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfor: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfor: null
            }
        case actionTypes.SELECTED_EXAM:
            return {
                ...state,
                selectedExam: action.payload,
            };
        case actionTypes.SELECTED_PARTS:
            return {
                ...state,
                selectedParts: action.payload,
            };
        case actionTypes.SET_REMAINING_TIME:
            return {
                ...state,
                selectedTime: action.payload * 60,
            };
        default:
            return state;
    }
}

export default appReducer;




