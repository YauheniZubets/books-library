import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { axiosForgotPassStart } from '../../saga/forgot-pass-saga';

import arrowRight from '../registration/img/arrow-right.svg';
import arrowLeft from './img/arrow-left.svg';

import './forgot-pass.css';

export const ForgotPass = (props) => {

    const {isError} = useSelector(state=>state.forgotPass);
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({mode:'onBlur'});

    const onSubmit = (userData) => {
        dispatch(axiosForgotPassStart(userData));
    };

    useEffect(()=>{
        if (isError) setError('root.serverError', { type: 'Error' });
    },[isError, setError])

    return (
    <section className='registration' >
        <div className='forgot-back-to-auth'>
            <Link to='/auth' >
                <div className='registration-sign-link'>
                    <div className='forgot-back-to-auth-img'>
                        <img src={arrowLeft} alt='arr-left' />
                    </div>  
                    <div className='forgot-back-to-auth-link-logo'>Вход в личный кабинет</div>
                </div>
            </Link>
        </div>
        <form className='registration-layout' onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
            <div className='registration-type reg-pad-bot-8'>Восстановление пароля</div>
            <div className='registration-inp'>
                <input name='email' id='email' {...register('email', {
                    required: true,
                    pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
                    })}
                   className={classNames('registration-inp-grey-bord', errors.email  && 'registration-inp-red-bord')}
                />
                <label htmlFor='email' 
                    className={classNames('registration-inp-lab', watch('email')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                >
                    Email
                </label>
                {
                    errors.email?.type === 'pattern' && 
                    <span data-test-id='hint' className={classNames('registration-new-advice', errors.email?.type === 'pattern' && 'registration-new-advice-red')}>
                        Введите корректный e-mail
                    </span>
                }
                {
                    errors.root?.serverError.type === 'Error' && 
                    <span data-test-id='hint' className={classNames('registration-new-advice',errors.root?.serverError.type === 'Error' && 'registration-new-advice-red')}>
                        error
                    </span>
                }
                {errors.email?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                <span data-test-id='hint' className={classNames('registration-new-advice forgot-disp-i-b')}>
                    На этот email  будет отправлено письмо с инструкциями по восстановлению пароля
                </span>
            </div>
            <div className='registration-but'>
                <button type='submit' >Восстановить</button>
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
    </section>
    )
}