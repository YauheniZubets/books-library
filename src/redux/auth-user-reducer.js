import {createAction, createReducer} from '@reduxjs/toolkit';

const AUTH_USER = 'AUTH_USER';
const AUTH_USER_FAILED = 'AUTH_USER_FAILED';
const AUTH_USER_FAILED_WRONG = 'AUTH_USER_FAILED_WRONG';
const AUTH_USER_SUCCEEDED = 'AUTH_USER_SUCCEEDED';
const AUTH_CLEAR_USER = 'AUTH_CLEAR_USER';

const initialState = {
    authUser: null,
    isLoading: false,
    isError: false,
    isErrorWrong: false
};

export const authUser = createAction(AUTH_USER);
export const authUserSuccess = createAction(AUTH_USER_SUCCEEDED);
export const authUserErr = createAction(AUTH_USER_FAILED);
export const authUserErrWrong = createAction(AUTH_USER_FAILED_WRONG);
export const authClearUser = createAction(AUTH_CLEAR_USER);

export const authUserReducer = createReducer(initialState, {
    [authUser]: (state) => {
        const newState = { ...state, isLoading : true};
        return newState;
    },
    [authUserSuccess]: (state, currentUser) => {
        const newState = { ...state, isErrorWrong: false, isLoading : false, isError : false, authUser: currentUser};
        return newState;
    },
    [authUserErr]: (state) => {
        const newState = { ...state, isLoading : false, isError: true, isErrorWrong: false};
        return newState;
    },
    [authUserErrWrong]: (state) => {
        const newState = { ...state, isLoading : false, isError: true, isErrorWrong: true};
        return newState;
    },
    [authClearUser]: (state) => {
        const newState = { ...state, authUser: null};
        return newState;
    }
})