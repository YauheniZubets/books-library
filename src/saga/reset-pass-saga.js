import {takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { resetPass, resetPassSuccess, resetPassErr } from '../redux/reset-pass-reducer';

export function* watchResetPass () {
    yield takeEvery('RESET_PASS_STARTED', axiosResetPass);
};

function* axiosResetPass (code) {
    try {
        yield put(resetPass());
        const data = yield call(() => axios.post('https://strapi.cleverland.by/api/auth/reset-password', code.code));
        yield put(resetPassSuccess(data))
    } catch (error) {
        yield put(resetPassErr());
    }
};

// экспорт в Component
export const axiosResetPassStart = (resetPassCode) =>({type: 'RESET_PASS_STARTED', code: resetPassCode});