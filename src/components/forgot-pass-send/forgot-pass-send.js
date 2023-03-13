import { Link } from "react-router-dom";

export const ForgotPassSend = (props) => {

    const {changedPass, send, changedPassErr, againToResetPassword} = props;

    return (
        <section className='registration reggged-succ-pad' data-test-id='status-block'>
                <div className='registration-type reggged-succ-pad-bot'>
                    {send && 'Письмо выслано'}
                    {changedPass && 'Новые данные сохранены'}
                    {changedPassErr && 'Данные не сохранились'}
                </div>
                <div className='registration-user-succ reggged-succ-pad-bot'>
                    {send && 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'}
                    {changedPass && 'Зайдите в личный кабинет, используя свои логин и новый пароль'}
                    {changedPassErr && 'Что-то пошло не так. Попробуйте ещё раз'}
                </div>
                <div className='registration-but'>
                    {
                        changedPass &&
                        <Link to='/auth' >
                            <button type='button'>Вход</button> 
                        </Link>
                    }
                    {
                        changedPassErr && <button type='button' onClick={againToResetPassword} >Повторить</button> 
                    }
                </div>
        </section>
    )
}