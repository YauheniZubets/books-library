import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import classNames from 'classnames';
import arrowRight from '../registration/img/arrow-right.svg';

import './reg-new-user.css';

export const RegNewUser = (props) => {

    const {registrationStage, changeStage} = props;

    const { register, watch, formState: { errors, isValid }, getValues } = useForm({mode:'onChange'});

    return (
    <section className='registration' >
        <div className='registration-layout'>
            <div className='registration-type'>Регистрация</div>
            <div className='registration-new-step'>{registrationStage} шаг из 3</div>
            <form data-test-id='register-form'>
                <div className='registration-inp'>
                    <input name='firstName' id='firstName' {...register('firstName', {required: true})} className={classNames('registration-inp-grey-bord', errors.firstName && 'registration-inp-red-bord')}/>
                    <label htmlFor='firstName' 
                        className={classNames('registration-inp-lab', watch('firstName')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        Имя
                    </label>
                    {errors.firstName?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-inp registration-inp-big-pd'>
                    <input name='lastName' id='lastName' {...register('lastName', {required: true})} className={classNames('registration-inp-grey-bord', errors.lastName && 'registration-inp-red-bord')}/>
                    <label htmlFor='lastName' 
                        className={classNames('registration-inp-lab', watch('lastName')?.length > 0 ? 'registration-inp-has-value' : 'registration-inp-no-value')} 
                    >
                        Фамилия
                    </label>
                    {errors.lastName?.type === 'required' && <span data-test-id='hint' className='registration-err'>Поле не может быть пустым</span>}
                </div>
                <div className='registration-but'>
                    <button type='button' disabled={!isValid} onClick={()=>changeStage(registrationStage + 1, getValues(['firstName', 'lastName']))}>Последний шаг</button> 
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