import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Registration } from '../../components/registration/registration';
import { Preloader } from '../../components/preloader/preloader';
import { NewUserResult } from '../../components/new-user-succ/newusersucc';

import { axiosAuthUserStart } from '../../saga/auth-user-saga';
import { axiosCategoriesStart } from '../../saga/categories-saga';
import { axiosStart } from '../../saga/books-saga';

import './registration-page.css';

export const RegistrationPage = () => {

    const [registrationStage, setStage] = useState(1);
    const [userDataToAuth, setUserDataToAuth] = useState(null);
    const {authUser, isLoading, isError, isErrorWrong} = useSelector(state => state.authUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveUserDataToLogIn = (dataFromRegComp) => setUserDataToAuth(dataFromRegComp);

    const userDataToAxiosAgain = () => { // повторная отправка данных для входа при ошибке
        if (userDataToAuth) dispatch(axiosAuthUserStart(userDataToAuth));
    };

    


    useEffect(()=> {
        if(isError && !isErrorWrong) setStage(3);
    }, [isError, isErrorWrong]);

    useEffect(()=>{
        if (localStorage.getItem('jwt')) navigate('/books/all');
    }, [navigate]);

    useEffect(()=> {
        if (authUser) {
            dispatch(axiosStart());
            dispatch(axiosCategoriesStart());
            navigate('/books/all');
            localStorage.setItem('jwt', authUser.payload.data.jwt);
        }
        // if(authUser) // link to books; hook: useNavigate и токен записать в редакс
        // если isErrorWrong то подписаться на него в компоненте с формой и там выдать ошибку
    }, [authUser, navigate, dispatch]);

    return(
        <section className='registration-page' >
            {
                isLoading && <Preloader />
            }
            <div className='registration-page-layout'>
                <div className='registration-page-layout-logo'>Cleverland</div>
                {registrationStage === 1 && <Registration userDataToLogIn={saveUserDataToLogIn} />}
                {registrationStage === 3 && <NewUserResult regErrAndAgain={true} userDataToAgain={userDataToAxiosAgain} />}
            </div>
        </section>
    
    )
}