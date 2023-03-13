import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { all } from "redux-saga/effects";

import { menuReducer } from "./toolkit-reducer";
import { choosedCategoryReducer } from "./choosedcategory-reducer";
import { fetchAllBooksReducer } from "./books-reducer";
import { fetchAllCategoriesReducer } from "./categories-reducer";
import { fetchOneBookReducer } from "./book-id-reducer";
import { categForBreadReducer } from "./categforbread-reducer";
import { regNewUserReducer } from "./reg-new-user-reducer";
import { authUserReducer } from "./auth-user-reducer";
import { forgotPassReducer } from "./forgot-pass-reducer";
import { resetPassReducer } from "./reset-pass-reducer";

import { watchAxiosProds } from "../saga/books-saga";
import { watchAxiosCategories } from "../saga/categories-saga";
import { watchAxiosOneBook } from "../saga/book-id-saga";
import { watchRegNewUser } from "../saga/reg-new-user-saga";
import { watchAuthUser } from "../saga/auth-user-saga";
import { watchForgotPass } from "../saga/forgot-pass-saga";
import { watchResetPass } from "../saga/reset-pass-saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware];

function* rootSaga() {
    yield all([
        watchAxiosProds(), 
        watchAxiosCategories(), 
        watchAxiosOneBook(), 
        watchRegNewUser(),
        watchAuthUser(),
        watchForgotPass(), 
        watchResetPass()
    ])
};

const rootReducer = combineReducers({
    toolkit: menuReducer,
    choosedCategory: choosedCategoryReducer,
    allBooksList: fetchAllBooksReducer,
    allCategories: fetchAllCategoriesReducer,
    book: fetchOneBookReducer,
    categForBread: categForBreadReducer,
    regNewUser: regNewUserReducer,
    authUser: authUserReducer,
    forgotPass: forgotPassReducer, 
    resetPass: resetPassReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware
})

sagaMiddleware.run(rootSaga);