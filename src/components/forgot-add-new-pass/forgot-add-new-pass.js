import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { axiosResetPassStart } from '../../saga/reset-pass-saga';

import hided from '../registration/img/hided.svg';
import showed from '../registration/img/showed.svg';
import passAppr from '../registration-new/img/pass-appr.svg';

import './forgot-add-new-pass.css';

export const ForgotAddNewPass = (props) => {

    const {code, addNewPassData} = props;

    const [showPass, tooglePass] = useState(false);
    const [showPassSecond, tooglePassSecond] = useState(false);

    const {isError} = useSelector(state=>state.forgotPass);
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors, isValid }, getValues, setError, clearErrors  } = useForm({ mode:'onBlur'});

    const onSubmit = (userData) => {
        const allNewPasswordData = {
            "password": userData.password,
            "passwordConfirmation": userData.passwordConfirmation,
            "code": code,
        };
        dispatch(axiosResetPassStart(allNewPasswordData));
        addNewPassData(userData.password, userData.passwordConfirmation, code);
    };

    const cbCheckBothPasswords = () => {
        const [firstPass, secondPass] = getValues(['password', 'passwordConfirmation']);
        if (firstPass && secondPass) {
            if (firstPass === secondPass) {
                if (errors.passwordConfirmation?.type === 'not-similar') clearErrors('passwordConfirmation');
            } else {
                setError('passwordConfirmation', { type: 'not-similar', message: 'Пароли не совпадают' });
            }
        }
    };

    const rules = [{
        pattern: "[A-Z]",
        target: "upper"
      },
      {
        pattern: "[0-9]",
        target: "numbers"
      }
    ];

    const checkPass = (passValue, rules) => {
        if (passValue?.length < 8) setError('password', { type: 'lengthMin' });
        rules.forEach(item => {
            if (!new RegExp(item.pattern).test(passValue)) {
                setError('password', { type: `${item.target}` });
            } 
        })
    };

    const cbCheckPass = () => {
        const pass = getValues('password');
        checkPass(pass, rules);
    }

    useEffect(()=>{
        if (isError) setError('root.serverError', { type: 'Error' });
    },[isError, setError])

    useEffect(()=>{
        console.log(errors.password);
    })


    return (
    <section className='registration'>
        <form className='registration-layout' onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
            <div className='registration-type reg-pad-bot-8'>Восстановление пароля</div>
            <div className='registration-inp'>
                <input name='password' id='password' type={showPass ? 'text' : 'password'} {...register('password', {
                    required: true,
                    minLength: 8,
                    onChange: cbCheckPass,
                    pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
                    })} className={classNames('registration-inp-grey-bord', errors.password && 'registration-inp-red-bord')}
                    onBlur={cbCheckBothPasswords}
                />
                <label htmlFor='password' 
                    className={classNames('registration-inp-lab', watch('password')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                >
                    Новый пароль
                </label>
                {errors.password?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                <span className={classNames('registration-new-advice', errors.password?.type === 'pattern' && 'registration-new-advice-red')} data-test-id='hint'>
                    Пароль <span data-test-id='hint' className={classNames(errors.password?.type === 'lengthMin' && 'registration-err')}>не менее 8 символов</span>, с 
                    <span data-test-id='hint' className={classNames(errors.password?.type === 'upper' && 'registration-err')}>заглавной буквой</span> и 
                    <span data-test-id='hint' className={classNames(errors.password?.type === 'numbers' && 'registration-err')}>цифрой</span>
                </span>
                {
                    showPass 
                    ? watch('password')?.length > 0 && <img data-test-id='eye-opened' src={showed} alt='showed' className='registration-pass-hided' onClick={()=>tooglePass(!showPass)} role='presentation' />
                    : watch('password')?.length > 0 && <img data-test-id='eye-closed' src={hided} className='registration-pass-hided' alt='hided' onClick={()=>tooglePass(!showPass)} role='presentation' />
                }
                {(!errors.password && watch('password')?.length > 0) && <img data-test-id='checkmark' src={passAppr} alt='passAppr' className='registration-pass-appr' />}
                
            </div>
            <div className='registration-inp registration-inp-sml-pd'>
                <input name='passwordConfirmation' id='passwordConfirmation' type={showPassSecond ? 'text' : 'password'} {...register('passwordConfirmation', {required: true})}
                    className={classNames('registration-inp-grey-bord', errors.passwordConfirmation && 'registration-inp-red-bord')}
                    onBlur={cbCheckBothPasswords}
                />
                <label htmlFor='passwordConfirmation' 
                    className={classNames('registration-inp-lab', watch('passwordConfirmation')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                >
                    Повторите пароль
                </label>
                {errors.passwordConfirmation?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                {
                    showPassSecond 
                    ? watch('passwordConfirmation')?.length > 0 && <img src={showed} alt='showed' className='registration-pass-hided' onClick={()=>tooglePassSecond(!showPassSecond)} role='presentation' />
                    : watch('passwordConfirmation')?.length > 0 && <img src={hided} className='registration-pass-hided' alt='hided' onClick={()=>tooglePassSecond(!showPassSecond)} role='presentation' />
                }
                
                {errors.passwordConfirmation?.type === 'not-similar' && <span data-test-id='hint' className='registration-err'>Пароли не совпадают</span>}
            </div>
            <div className={classNames('registration-but', errors.passwordConfirmation?.type === 'not-similar' && 'forgot-but-white-back')}>
                <button type='submit' disabled={!isValid} >Сохранить изменения</button>
            </div>
            <div className='forgot-advice-bot'>
                После сохранения войдите в библиотеку, используя новый пароль
            </div>
        </form>
    </section>
    )
}