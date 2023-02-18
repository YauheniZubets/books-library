

import fetchErr from './img/fetchErr.svg';
import closeErr from './img/close-err.svg';

import './errfetch.css';

export const ErrFetch = () => (

    <div className='url-error' data-test-id='error' >
        <img src={fetchErr} alt='fetch-err'/>
        <div>Что-то пошло не так. Обновите страницу через некоторое время</div>
        <img src={closeErr} alt='close-err'/>
    </div>
)