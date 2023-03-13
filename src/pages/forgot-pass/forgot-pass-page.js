import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ForgotPass } from '../../components/forgot-pass/forgot-pass';
import { ForgotAddNewPass } from '../../components/forgot-add-new-pass/forgot-add-new-pass';
import { ForgotPassSend } from '../../components/forgot-pass-send/forgot-pass-send';
import { Preloader } from '../../components/preloader/preloader';

import { axiosResetPassStart } from '../../saga/reset-pass-saga';

import './forgos-pass-page.css';

export const ForgotPassPage = () => {

    const [forgotStage, setForgotStage] = useState(1);
    const [newPassData, setNewPassData] = useState({
        password: '',
        passwordConfirmation: '',
        code: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {forgotPassResponse} = useSelector(state=>state.forgotPass);
    const forgotPassLoader = useSelector(state=>state.forgotPass.isLoading);
    const {isError, isLoading, resetPassResponse} = useSelector(state=>state.resetPass);

    const loc = useLocation();
    const codeForReset = loc?.search.slice(6);

    const addNewPassData = (pass, confPass, codeFrom) => {
        if (pass && confPass && codeFrom) setNewPassData({...newPassData,
            password: pass,
            passwordConfirmation: confPass,
            code: codeFrom
        })
    }

    const axiosAgainResetPassword = () => {
        if (newPassData) dispatch(axiosResetPassStart(newPassData));
    };

    useEffect(()=>{
        if (codeForReset) setForgotStage(3);
    }, [codeForReset]);

    useEffect(()=>{
        if (forgotPassResponse) setForgotStage(2);
    }, [forgotPassResponse]);

    useEffect(()=>{
        if (resetPassResponse) setForgotStage(4);
    }, [resetPassResponse]);

    useEffect(()=>{
        if (isError) setForgotStage(5);
    }, [isError]);

    useEffect(()=>{
        if (localStorage.getItem('jwt')) navigate('/books/all');
    }, [navigate]);


    return (
        <section className='registration-page'>
            {
                isLoading && <Preloader />
            }
            {
                forgotPassLoader && <Preloader />
            }
            <div className='registration-page-layout'>
                <div className='registration-page-layout-logo'>Cleverland</div>
                {forgotStage === 1 && <ForgotPass />}
                {forgotStage === 2 && <ForgotPassSend send={true} />}
                {forgotStage === 3 && <ForgotAddNewPass code={codeForReset} addNewPassData={addNewPassData} />}
                {forgotStage === 4 && <ForgotPassSend changedPass={true} />}
                {forgotStage === 5 && <ForgotPassSend changedPassErr={true} againToResetPassword={axiosAgainResetPassword} />}
            </div>
        </section>
    )
}