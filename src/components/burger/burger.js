import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { authClearUser } from '../../redux/auth-user-reducer';

import arrowTop from '../navigation/img/arrow-top.svg';
import arrowBot from '../navigation/img/arrow-bot.svg';

import { showMobileMenu } from '../../redux/toolkit-reducer';

import './burger.css';

export const Burger = (props) => {
    
    const [allLinks, toogleAllLinks] = useState(true);
    const [clickedCategory, setColorAllLinks] = useState(true);
    const categs = useSelector(state=>state.allCategories.allCategories.payload);
    const allBooks = useSelector(state=>state.allBooksList.allBooks.payload);

    const arrOfQuan = []; // массив количесва книг по категориям
    if (categs && allBooks) {
        categs.forEach(category => {
            const filteredBooksArr = allBooks.filter(item => item.categories.includes(category.name));
            arrOfQuan.push(filteredBooksArr.length);
        });
    }

    const loc = useLocation();

    useEffect(() => loc.pathname.substring(1, 6)=== 'books' ? setColorAllLinks(true) : setColorAllLinks(false), [loc.pathname]);

    const dispatch = useDispatch();

    const mobMenu = useSelector(state => state.toolkit.showMobileMenu);

    const cbShowAllLinks = (ev) => {
        if (!ev) return;
        const elem = ev.target;
        if (!elem) return;
        toogleAllLinks(!allLinks);
        ev.stopPropagation();
    }

    const closeBurgerOnLinked = (ev) => {
        if (!ev) return;
        const current = ev.target.tagName;
        if (!current) return;
        if (current === 'LI') dispatch(showMobileMenu());
        ev.stopPropagation();
    }

    const cbCloseBurger = (ev) => {
        dispatch(showMobileMenu());
        ev.stopPropagation();
    }

    const cbLogOut = () => {
        const loggedTokenUserFromLocal = localStorage.getItem('jwt');
        if (loggedTokenUserFromLocal) {
            localStorage.removeItem('jwt');
            dispatch(authClearUser());
        }
    }

    let categsList = null;

    if(categs) {
        categsList = categs.map(( item, index ) => 
            <div key={item.id}>
                <NavLink to={`/books/:${item.path}`} 
                    className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                >
                    <li className='text-normal' data-test-id={`burger-${item.path}`}>
                        {item.name} 
                    </li>
                </NavLink>
                <span className='text-light' data-test-id={`burger-book-count-for-${item.path}`}>
                    {arrOfQuan[index]}
                </span>
            </div>
        )
    }

    return (
        <section data-test-id='button-burger'>
            <div 
                onClick = {cbCloseBurger}
                className = {classNames('Burger', {visible: mobMenu})}
                role='presentation'
            >
                <span />
                <span />
                <span />
            </div>
            
            <div 
                className={classNames('Mobile-Menu', {[`Mobile-Menu-Visible`]: mobMenu})} 
                role='presentation'
                data-test-id='burger-navigation'
            >   
                <div className={classNames('navigation-name-cover mobile-menu-header', {[`mobile-menu-wide-padding`]:!allLinks})}
                    onClick={cbShowAllLinks}
                    role='presentation'
                    data-test-id='burger-showcase'
                >
                    <div className={classNames('navigation-name', {[`coloredLink`]: clickedCategory})}>Витрина книг</div>
                    <div><img src={allLinks ? arrowBot : arrowTop} alt='arrow' /></div>
                </div>
                <div className={classNames('Nav-Links-Mobile', {showMobile: allLinks})} onClick={closeBurgerOnLinked} role='presentation'>
                    <ul>
                        {
                            categs && 
                            <div>
                                <NavLink to='/books/:all' className={({ isActive }) => isActive ? 'coloredLink' : undefined} 
                                    data-test-id='burger-books'
                                >
                                    <li className='text-normal'>Все книги 
                                        <span className='text-light' />
                                    </li>
                                </NavLink>
                            </div>
                        }
                        {categsList}
                    </ul>
                </div>
                <div className='navigation-rules'>
                    <NavLink to='/rules' className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                        data-test-id='burger-terms'
                    >
                        Правила пользования
                    </NavLink>
                </div>
                <div className='navigation-rules'>
                    <NavLink to='/agreement' className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                        data-test-id='burger-contract'
                    >
                        Договор оферты
                    </NavLink>
                </div>
                <div className='hor-line' />
                <div className='navigation-rules'>
                    <NavLink to='' >Профиль</NavLink>
                </div>
                <div className='navigation-rules'>
                    <NavLink to='/auth' onClick={cbLogOut} data-test-id='exit-button'>Выход</NavLink>
                </div>
            </div>
        </section>
    )
}