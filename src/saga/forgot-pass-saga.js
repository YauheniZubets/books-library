import {takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { forgotPass, forgotPassSuccess, forgotPassErr } from '../redux/forgot-pass-reducer';

export function* watchForgotPass () {
    yield takeEvery('FORGOT_PASS_STARTED', axiosForgotPass);
};

function* axiosForgotPass (mail) {
    try {
        yield put(forgotPass());
        const data = yield call(() => axios.post('https://strapi.cleverland.by/api/auth/forgot-password', mail.email));
        console.log('data: ', data);
        yield put(forgotPassSuccess(data))
    } catch (error) {
        yield put(forgotPassErr());
    }
};

// экспорт в Component
export const axiosForgotPassStart = (forgotPassEmail) =>({type: 'FORGOT_PASS_STARTED', email: forgotPassEmail});