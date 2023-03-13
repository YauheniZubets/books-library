import {takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { userToken } from './user-interception';

import { fetchAllCategories, fetchAllCategoriesSuccess, fetchAllCategoriesErr } from '../redux/categories-reducer';

export function* watchAxiosCategories () {
    yield takeEvery('AXIOS_CATEGORIES_STARTED', axiosCategories);
};

function* axiosCategories () {
    try {
        yield put(fetchAllCategories());
        const data = yield call(() => axios.get('https://strapi.cleverland.by/api/categories'));
        yield put(fetchAllCategoriesSuccess(data.data))
    } catch (error) {
        yield put(fetchAllCategoriesErr());
    }
};

// экспорт в App
export const axiosCategoriesStart = () =>({type: 'AXIOS_CATEGORIES_STARTED'});