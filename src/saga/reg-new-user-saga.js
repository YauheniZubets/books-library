import {takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { regNewUser, regNewUserSuccess, regNewUserkErr, regUserkErrLogged } from '../redux/reg-new-user-reducer';

export function* watchRegNewUser () {
    yield takeEvery('REG_NEW_USER_STARTED', axiosNewUser);
};

function* axiosNewUser (user) {
    try {
        yield put(regNewUser());
        const data = yield call(() => axios.post('https://strapi.cleverland.by/api/auth/local/register', user.user));
        yield put(regNewUserSuccess(data))
    } catch (error) {
        if (error.response.status === 400) {
            yield put(regUserkErrLogged()); 
        } else {
            yield put(regNewUserkErr());
        }
    }
};

// экспорт в Component
export const axiosNewUserStart = (userForReg) =>({type: 'REG_NEW_USER_STARTED', user: userForReg});