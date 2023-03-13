import { Link } from 'react-router-dom';

import { Burger } from '../burger/burger';

import logo from './img/logo.png';
import avatar from './img/avatar.png';

import './header.css';

export const Header = (props) => (

    <section className='header' >
        <div className='header-names'>
            <div className='header-burger'>
                <Burger isMenuOpen={props.isMenuOpen} clickCross={props.clickCross} />
            </div>
            <Link to='/books/all'>
                <div className='cleverland-logo'>
                    <img src={logo} alt='logo'/>
                </div>
            </Link>
            <div className='text-head head-pos'>Библиотека</div>
            <div className='login'>
                <div className='text-login'>Привет, Иван!</div>
                <div>
                    <img src={avatar} alt='ava'/>
                </div>
            </div>
        </div>
    </section>

)