import {createAction, createReducer} from '@reduxjs/toolkit';

const initialState = {
    showMobileMenu: false
}

export const showMobileMenu = createAction('SHOW_MOBILE_MENU');

export const menuReducer = createReducer(initialState, {
    [showMobileMenu]: (state) => {
        const newState = { ...state, showMobileMenu : !state.showMobileMenu};
        return newState;
    }
})