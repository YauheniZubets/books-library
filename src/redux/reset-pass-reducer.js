import {createAction, createReducer} from '@reduxjs/toolkit';

const RESET_PASS = 'RESET_PASS';
const RESET_PASS_FAILED = 'RESET_PASS_FAILED';
const RESET_PASS_SUCCEEDED = 'RESET_PASS_SUCCEEDED';

const initialState = {
    resetPassResponse: null,
    isLoading: false,
    isError: false,
};

export const resetPass = createAction(RESET_PASS);
export const resetPassSuccess = createAction(RESET_PASS_SUCCEEDED);
export const resetPassErr = createAction(RESET_PASS_FAILED);

export const resetPassReducer = createReducer(initialState, {
    [resetPass]: (state) => {
        const newState = { ...state, isLoading : true};
        return newState;
    },
    [resetPassSuccess]: (state, resp) => {
        const newState = { ...state, isLoading : false, isError : false, resetPassResponse: resp};
        return newState;
    },
    [resetPassErr]: (state) => {
        const newState = { ...state, isLoading : false, isError: true };
        return newState;
    }
})