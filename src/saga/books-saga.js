import {takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { userToken } from './user-interception';

import { fetchAllBooks, fetchAllBooksSuccess, fetchAllBooksErr } from '../redux/books-reducer';

export function* watchAxiosProds () {
    yield takeEvery('AXIOS_STARTED', axiosProds);
};

function* axiosProds () {
    console.log('allbooksfetching');
    try {
        yield put(fetchAllBooks());
        const data = yield call(() => axios.get('https://strapi.cleverland.by/api/books'));
        yield put(fetchAllBooksSuccess(data.data))
    } catch (error) {
        yield put(fetchAllBooksErr());
    }
};

// экспорт в App
export const axiosStart = () =>({type: 'AXIOS_STARTED'});