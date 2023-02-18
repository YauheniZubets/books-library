import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
    choosedCategory: ''
}

export const choosedCategory = createAction('CHOOSE_CATEGORY');

export const choosedCategoryReducer = createReducer(initialState, {
    [choosedCategory]: (state, newCategory) => {
        const newState = { ...state, choosedCategory : newCategory};
        return newState;
    }
})