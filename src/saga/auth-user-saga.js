import {takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { authUser, authUserSuccess, authUserErr, authUserErrWrong } from '../redux/auth-user-reducer';

export function* watchAuthUser () {
    yield takeEvery('AUTH_USER_STARTED', axiosAuthUser);
};

function* axiosAuthUser (user) {
    try {
        yield put(authUser());
        const data = yield call(() => axios.post('https://strapi.cleverland.by/api/auth/local', user.user));
        console.log('data: ', data);
        yield put(authUserSuccess(data))
    } catch (error) {
        console.log('error: ', error);
        if (error.response.status === 400) {
            yield put(authUserErrWrong());
        } else {
            yield put(authUserErr());
        }
    }
};

// экспорт в Component
export const axiosAuthUserStart = (userEnter) =>({type: 'AUTH_USER_STARTED', user: userEnter});