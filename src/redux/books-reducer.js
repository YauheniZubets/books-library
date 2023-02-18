import {createAction, createReducer} from '@reduxjs/toolkit';

const AXIOSED_TO_URL = 'AXIOSED_TO_URL';
const AXIOS_FAILED = 'AXIOS_FAILED';
const AXIOSED_SUCCEEDED = 'AXIOSED_SUCCEEDED';

const initialState = {
    allBooks: [],
    isLoading: false,
    isError: false
}

export const fetchAllBooks = createAction(AXIOSED_TO_URL);
export const fetchAllBooksSuccess = createAction(AXIOSED_SUCCEEDED);
export const fetchAllBooksErr = createAction(AXIOS_FAILED);

export const fetchAllBooksReducer = createReducer(initialState, {
    [fetchAllBooks]: (state) => {
        const newState = { ...state, isLoading : true};
        return newState;
    },
    [fetchAllBooksSuccess]: (state, booksList) => {
        const newState = { ...state, isLoading : false, isError : false, allBooks: booksList};
        return newState;
    },
    [fetchAllBooksErr]: (state) => {
        const newState = { ...state, isLoading : false, isError: true};
        return newState;
    }
})