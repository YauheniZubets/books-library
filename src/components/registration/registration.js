import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { axiosAuthUserStart } from '../../saga/auth-user-saga';

import arrowRight from './img/arrow-right.svg';
import hided from './img/hided.svg';
import showed from './img/showed.svg';
import passAppr from '../registration-new/img/pass-appr.svg';

import './registration.css';

export const Registration = (props) => {

    const {userDataToLogIn} = props;

    const [showPass, tooglePass] = useState(false);
    
    const dispatch = useDispatch();
    const { isErrorWrong } = useSelector(state => state.authUser);

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({mode:'onBlur'});

    const onSubmit = (userData) => {
        if (userData) {
            dispatch(axiosAuthUserStart(userData));
            userDataToLogIn(userData);
        }
    };

    useEffect(()=>{
        if (isErrorWrong) setError('root.serverError', { type: 'this_user_exsist' });
    },[isErrorWrong, setError])

    return (
    <section className='registration' >
        <div className='registration-layout'>
            <div className='registration-type reg-pad-bot-8'>Вход в личный кабинет</div>
            <form onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
                <div className='registration-inp'>
                    <input name='identifier' id='identifier' {...register('identifier', {required: true})}
                    className={classNames('registration-inp-grey-bord', 
                        (errors.identifier || errors.root?.serverError.type === 'this_user_exsist') && 'registration-inp-red-bord')}
                    />
                    <label htmlFor='identifier' 
                        className={classNames('registration-inp-lab', watch('identifier')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        Логин
                    </label>
                    {errors.identifier?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-inp registration-inp-sml-pd'>
                    <input name='password' id='password' type={showPass ? 'text' : 'password'} {...register('password', {required: true})}
                        className={classNames('registration-inp-grey-bord', 
                        (errors.password || errors.root?.serverError.type === 'this_user_exsist') && 'registration-inp-red-bord')}
                    />
                    <label htmlFor='password' 
                        className={classNames('registration-inp-lab', watch('password')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        Пароль
                    </label>
                    {
                        showPass 
                        ? watch('password')?.length > 0 && <img data-test-id='eye-opened' src={showed} alt='showed' className='registration-pass-hided' onClick={()=>tooglePass(!showPass)} role='presentation' />
                        : watch('password')?.length > 0 && <img data-test-id='eye-closed' src={hided} className='registration-pass-hided' alt='hided' onClick={()=>tooglePass(!showPass)} role='presentation' />
                    }
                    {(!errors.password && watch('password')?.length > 0) && <img data-test-id='checkmark' src={passAppr} alt='passAppr' className='registration-pass-appr' />}
                    {errors.password?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-forget' >
                    {
                        errors.root?.serverError.type === 'this_user_exsist' 
                        ? <div className='registration-forget-link'>
                            <span data-test-id='hint' className='registration-new-advice-red'>Неверный логин или пароль!</span>
                            <Link to='/forgot-pass' className='reg-black-col'>Восстановить?</Link>
                        </div>
                        : <Link to='/forgot-pass'>Забыли логин или пароль?</Link>
                    }
                </div>
                <div className='registration-but'>
                    <button type='submit' >Вход</button>
                </div>
                <div className='registration-sign'>
                    <div className='registration-sign-no-user'>Нет учетной записи?</div>
                    <Link to='/registration' >
                        <div className='registration-sign-link'>
                            <div className='registration-sign-link-logo'>Регистрация</div>
                            <div>
                                <img src={arrowRight} alt='arr-right' />
                            </div>  
                        </div>
                    </Link>
                </div>
            </form>
        </div>
        
        
    </section>
    )
}