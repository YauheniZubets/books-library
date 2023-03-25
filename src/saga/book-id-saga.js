import {takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { fetchOneBook, fetchOneBookSuccess, fetchOneBookErr } from '../redux/book-id-reducer';

export function* watchAxiosOneBook () {
    yield takeEvery('AXIOS_ONE_BOOK_STARTED', axiosOneBook);
};

function* axiosOneBook (id) {
    try {
        yield put(fetchOneBook());
        const data = yield call(() => axios.get(`https://strapi.cleverland.by/api/books/${id.id}`));
        yield put(fetchOneBookSuccess(data.data))
    } catch (error) {
        yield put(fetchOneBookErr());
    }
};

// экспорт в App
export const axiosOneBookStart = (bookId) =>({type: 'AXIOS_ONE_BOOK_STARTED', id: bookId});