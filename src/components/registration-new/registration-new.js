/*eslint-disable*/
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import classNames from 'classnames';
import arrowRight from '../registration/img/arrow-right.svg';
import hided from '../registration/img/hided.svg';
import showed from '../registration/img/showed.svg';
import passAppr from './img/pass-appr.svg';

import './registration-new.css';

export const RegistrationNew = (props) => {

    const {registrationStage, changeStage} = props;

    const [showPass, tooglePass] = useState(false);
    const { register, watch, formState: { errors, isValid }, getValues, setError, clearErrors } = useForm({criteriaMode: "all", mode:'onBlur'});

    const rules = [{
        pattern: "[A-Z]",
        target: "upper"
      },
      {
        pattern: "[0-9]",
        target: "numbers"
      }
    ];

    const loginRules = [{
        pattern: "[a-z]",
        target: "words"
      },
      {
        pattern: "[0-9]",
        target: "numbers"
      }
    ];

    const checkLogin = (logValue, rules) => {
        const symbReg = new RegExp('[!@@#$%^&*]');
        if (symbReg.test(logValue)) {
            setError('username', { type: 'all' });
        } else {
            rules.forEach(item => {
                if (!new RegExp(item.pattern).test(logValue)) {
                    setError('username', { type: `${item.target}` });
                } else {
                    clearErrors('username')
                }
            })
        }
    };

    const checkPass = (passValue, rules) => {
        if (passValue?.length < 8) setError('password', { type: 'lengthMin' });
        rules.forEach(item => {
            if (!new RegExp(item.pattern).test(passValue)) {
                setError('password', { type: `${item.target}` });
            } 
        })
    }

    const cbCheckUsername = () => {
        const login = getValues('username');
        checkLogin(login, loginRules);
    }

    const cbCheckPass = () => {
        const pass = getValues('password');
        checkPass(pass, rules);
    }

    useEffect(()=>{
        console.log(errors.password);
    })

    return (
    <section className='registration' >
        <div className='registration-layout'>
            <div className='registration-type'>Регистрация</div>
            <div className='registration-new-step'>{registrationStage} шаг из 3</div>
            <form  data-test-id='register-form'>
                <div className='registration-inp'>
                    <input type='text' name='username' id='username' {...register('username', {
                        required: true,
                        pattern: /^[a-zA-Z0-9]+$/,
                        onChange: cbCheckUsername
                        })} className={classNames('registration-inp-grey-bord', errors.username && 'registration-inp-red-bord')}
                    />
                    <label htmlFor='username' 
                        className={classNames('registration-inp-lab', watch('username')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        Придумайте логин для входа
                    </label>
                    <span data-test-id='hint' className={classNames('registration-new-advice', errors.username?.type === 'pattern' && 'registration-new-advice-red')}>
                        Используйте для логина&nbsp;
                        <span data-test-id='hint' className={classNames(errors.username?.type === 'words' && 'registration-err')}>латинский алфавит</span> и&nbsp;
                        <span data-test-id='hint' className={classNames(errors.username?.type === 'numbers' && 'registration-err')}>цифры</span>
                    </span>
                    {errors.username?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-inp registration-inp-sml-pd'>
                    <input name='password' id='password' type={showPass ? 'text' : 'password'} {...register('password', {
                        required: true,
                        minLength: 8,
                        onChange: cbCheckPass,
                        pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
                        })} className={classNames('registration-inp-grey-bord', errors.password && 'registration-inp-red-bord')}
                    />
                    <label htmlFor='password' 
                        className={classNames('registration-inp-lab', watch('password')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        Пароль
                    </label>
                    <span data-test-id='hint' className={classNames('registration-new-advice', errors.password?.type === 'pattern' && 'registration-new-advice-red')}>
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
                    {errors.password?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-but'>
                    <button type='button' disabled={!isValid} onClick={()=>changeStage(registrationStage + 1, getValues(['username', 'password']))}>Следующий шаг</button> 
                </div>
                <div className='registration-sign'>
                    <div className='registration-sign-no-user'>Есть учетная запись?</div>
                    <Link to='/auth' >
                        <div className='registration-sign-link'>
                            <div className='registration-sign-link-logo'>Войти</div>
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