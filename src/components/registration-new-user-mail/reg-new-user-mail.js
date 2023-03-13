import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import { useDispatch } from 'react-redux';

import classNames from 'classnames';
import { axiosNewUserStart } from '../../saga/reg-new-user-saga';
import arrowRight from '../registration/img/arrow-right.svg';

export const RegNewUserMail = (props) => {

    const {registrationStage, userDataFromPrev, addUserMail} = props;

    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors, isValid }, setValue } = useForm({mode:'onBlur'});

    const onSubmit = data => {
        const allNewUserData = {
            "email": data.email,
            "username": userDataFromPrev.username,
            "password": userDataFromPrev.password,
            "firstName": userDataFromPrev.firstName,
            "lastName": userDataFromPrev.lastName,
            "phone": data.phone
        };
        dispatch(axiosNewUserStart(allNewUserData));
        addUserMail(data.email, data.phone);
    }

    return (
    <section className='registration' >
        <div className='registration-layout'>
            <div className='registration-type'>Регистрация</div>
            <div className='registration-new-step'>{registrationStage} шаг из 3</div>
                <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                    <div className='registration-inp'>
                    <MaskedInput name='phone' id='phone' placeHolder='+375 (44) xxx-xx-xx' {...register('phone', {
                        required: true,
                        pattern: /^\+375 \((25|29|33|44)\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
                        onChange: (e) => setValue('phone', e.target.value)
                        })} 
                        className={classNames('registration-inp-grey-bord', errors.phone && 'registration-inp-red-bord')}
                        mask={['+', '3','7','5', ' ', '(', /[2|3|4]/, /[9|5|3|4]/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                        keepCharPositions={true}
                        showMask={true}
                        guide={false}
                        
                    />
                    <label htmlFor='phone' 
                        className={classNames('registration-inp-lab', watch('phone')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        Номер телефона
                    </label>
                    <span data-test-id='hint' className={classNames('registration-new-advice', errors.phone?.type === 'pattern' && 'registration-new-advice-red')}>
                        В формате +375 (xx) xxx-xx-xx
                    </span>
                    {errors.phone?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-inp registration-inp-big-pd'>
                    <input name='email' id='email' {...register('email', {
                        required: true,
                        pattern: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
                        })} className={classNames('registration-inp-grey-bord', errors.email && 'registration-inp-red-bord')}

                    />
                    <label htmlFor='email' 
                        className={classNames('registration-inp-lab', watch('email')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        E-mail
                    </label>
                    {
                        errors.email?.type === 'pattern' && 
                        <span data-test-id='hint' className={classNames('registration-new-advice', errors.email?.type === 'pattern' && 'registration-new-advice-red')}>
                            Введите корректный e-mail
                        </span>
                    }
                    {errors.email?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-but'>
                    <button type='submit' disabled={!isValid}>Зарегистрироваться</button> 
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