import {createAction, createReducer} from '@reduxjs/toolkit';

const REG_NEW_USER = 'REG_NEW_USER';
const REG_NEW_USER_FAILED = 'REG_NEW_USER_FAILED';
const REG_USER_FAILED_LOGGED = 'REG_USER_FAILED_LOGGED';
const REG_NEW_USER_SUCCEEDED = 'REG_NEW_USER_SUCCEEDED';

const initialState = {
    newRegUser: null,
    isLoading: false,
    isError: false,
    userAlreadyLogged: false
};

export const regNewUser = createAction(REG_NEW_USER);
export const regNewUserSuccess = createAction(REG_NEW_USER_SUCCEEDED);
export const regNewUserkErr = createAction(REG_NEW_USER_FAILED);
export const regUserkErrLogged = createAction(REG_USER_FAILED_LOGGED);

export const regNewUserReducer = createReducer(initialState, {
    [regNewUser]: (state) => {
        const newState = { ...state, isLoading : true};
        return newState;
    },
    [regNewUserSuccess]: (state, newUser) => {
        const newState = { ...state, userAlreadyLogged: false, isLoading : false, isError : false, newRegUser: newUser};
        return newState;
    },
    [regNewUserkErr]: (state) => {
        const newState = { ...state, isLoading : false, isError: true, userAlreadyLogged: false};
        return newState;
    },
    [regUserkErrLogged]: (state) => {
        const newState = { ...state, isLoading : false, isError: true, userAlreadyLogged: true};
        return newState;
    }
})