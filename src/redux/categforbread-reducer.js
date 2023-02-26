import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
    categForBreadReducer: ''
}

export const categForBread = createAction('CHOOSE_CATEGORY_FOR_BREAD');

export const categForBreadReducer = createReducer(initialState, {
    [categForBread]: (state, newCategory) => {
        const newState = { ...state, categForBread : newCategory};
        return newState;
    }
})