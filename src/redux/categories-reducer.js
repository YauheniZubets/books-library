import { createAction, createReducer } from "@reduxjs/toolkit";

const AXIOSED_CATEGS_TO_URL = 'AXIOSED_CATEGS_TO_URL';
const AXIOS_CATEGS_FAILED = 'AXIOS_CATEGS_FAILED';
const AXIOSED_CATEGS_SUCCEEDED = 'AXIOSED_CATEGS_SUCCEEDED';

const initialState = {
    allCategories: [],
    isLoading: false,
    isError: false
}

export const fetchAllCategories = createAction(AXIOSED_CATEGS_TO_URL);
export const fetchAllCategoriesSuccess = createAction(AXIOSED_CATEGS_SUCCEEDED);
export const fetchAllCategoriesErr = createAction(AXIOS_CATEGS_FAILED);

export const fetchAllCategoriesReducer = createReducer(initialState, {
    [fetchAllCategories]: (state) => {
        const newState = { ...state, isLoading : true};
        return newState;
    },
    [fetchAllCategoriesSuccess]: (state, categoriesList) => {
        const newState = { ...state, isLoading : false, isError : false, allCategories: categoriesList};
        return newState;
    },
    [fetchAllCategoriesErr]: (state) => {
        const newState = { ...state, isLoading : false, isError: true};
        return newState;
    }
})