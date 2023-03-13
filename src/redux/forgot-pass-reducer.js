import {createAction, createReducer} from '@reduxjs/toolkit';

const FORGOT_PASS = 'FORGOT_PASS';
const FORGOT_PASS_FAILED = 'FORGOT_PASS_FAILED';
const FORGOT_PASS_SUCCEEDED = 'FORGOT_PASS_SUCCEEDED';

const initialState = {
    forgotPassResponse: null,
    isLoading: false,
    isError: false,
};

export const forgotPass = createAction(FORGOT_PASS);
export const forgotPassSuccess = createAction(FORGOT_PASS_SUCCEEDED);
export const forgotPassErr = createAction(FORGOT_PASS_FAILED);

export const forgotPassReducer = createReducer(initialState, {
    [forgotPass]: (state) => {
        const newState = { ...state, isLoading : true};
        return newState;
    },
    [forgotPassSuccess]: (state, resp) => {
        const newState = { ...state, isLoading : false, isError : false, forgotPassResponse: resp};
        return newState;
    },
    [forgotPassErr]: (state) => {
        const newState = { ...state, isLoading : false, isError: true };
        return newState;
    }
})