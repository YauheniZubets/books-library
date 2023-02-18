import {createAction, createReducer} from '@reduxjs/toolkit';

const AXIOSED_BOOK_TO_URL = 'AXIOSED_BOOK_TO_URL';
const AXIOS_BOOK_FAILED = 'AXIOS_BOOK_FAILED';
const AXIOSED_BOOK_SUCCEEDED = 'AXIOSED_BOOK_SUCCEEDED';

const initialState = {
    book: [],
    isLoading: false,
    isError: false
};

export const fetchOneBook = createAction(AXIOSED_BOOK_TO_URL);
export const fetchOneBookSuccess = createAction(AXIOSED_BOOK_SUCCEEDED);
export const fetchOneBookErr = createAction(AXIOS_BOOK_FAILED);

export const fetchOneBookReducer = createReducer(initialState, {
    [fetchOneBook]: (state) => {
        const newState = { ...state, isLoading : true};
        return newState;
    },
    [fetchOneBookSuccess]: (state, bookData) => {
        const newState = { ...state, isLoading : false, isError : false, book: bookData};
        return newState;
    },
    [fetchOneBookErr]: (state) => {
        const newState = { ...state, isLoading : false, isError: true};
        return newState;
    }
})