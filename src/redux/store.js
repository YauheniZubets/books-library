import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { all } from "redux-saga/effects";

import { menuReducer } from "./toolkit-reducer";
import { fetchAllBooksReducer } from "./books-reducer";
import { fetchAllCategoriesReducer } from "./categories-reducer";
import { fetchOneBookReducer } from "./book-id-reducer";

import { watchAxiosProds } from "../saga/books-saga";
import { watchAxiosCategories } from "../saga/categories-saga";
import { watchAxiosOneBook } from "../saga/book-id-saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];


function* rootSaga() {
    yield all([watchAxiosProds(), watchAxiosCategories(), watchAxiosOneBook()])
};

const rootReducer = combineReducers({
    toolkit: menuReducer,
    allBooksList: fetchAllBooksReducer,
    allCategories: fetchAllCategoriesReducer,
    book: fetchOneBookReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware
})

sagaMiddleware.run(rootSaga);