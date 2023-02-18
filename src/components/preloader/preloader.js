import preloader from './img/preloader.svg';

import './preloader.css';

export const Preloader = () => (

    <div className='preloader' data-test-id='loader'>
        <img src={preloader} alt='preloader' />
    </div>

)