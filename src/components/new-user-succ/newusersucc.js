import { Link } from "react-router-dom";

import './newusersucc.css';

export const NewUserResult = (props) => {

    const {succ, err, logged, againToRegUserdata, backToFirstStage, regErrAndAgain, userDataToAgain} = props;

    return (
        <section className='registration reggged-succ-pad' data-test-id='status-block' >
                <div className='registration-type reggged-succ-pad-bot'>
                    {succ && 'Регистрация успешна'}
                    {(err || logged) && 'Данные не сохранились'}
                    {regErrAndAgain && 'Вход не выполнен'}
                </div>
                <div className='registration-user-succ reggged-succ-pad-bot'>
                    {succ && 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'}
                    {err && 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'}
                    {logged && 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'}
                    {regErrAndAgain && 'Что-то пошло не так. Попробуйте ещё раз'}
                </div>
                <div className='registration-but'>
                    {
                        succ &&
                        <Link to='/auth' >
                            <button type='button' >Вход</button> 
                        </Link>
                    }
                    {
                        err && <button type='button' onClick={againToRegUserdata} >Повторить</button> 
                    }
                    {
                        logged && <button type='button' onClick={backToFirstStage} >Назад к регистрации</button> 
                    }
                    {
                        regErrAndAgain && <button type='button' onClick={userDataToAgain} >Повторить</button> 
                    }
                </div>
        </section>
    )
}