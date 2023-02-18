import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { categories } from '../navigation/categories';

import arrowTop from '../navigation/img/arrow-top.svg';
import arrowBot from '../navigation/img/arrow-bot.svg';

import { showMobileMenu } from '../../redux/toolkit-reducer';

import './burger.css';

export const Burger = (props) => {
    
    const [allLinks, toogleAllLinks] = useState(true);
    const [clickedCategory, setColorAllLinks] = useState(true);
    const categs = useSelector(state=>state.allCategories.allCategories.payload);
    const allBooksQuan = useSelector(state=>state.allBooksList.allBooks.payload);

    const loc = useLocation();

    useEffect(() => loc.pathname.substring(1, 6)=== 'books' ? setColorAllLinks(true) : setColorAllLinks(false), [loc.pathname]);

    const dispatch = useDispatch();

    const mobMenu = useSelector(state => state.toolkit.showMobileMenu);

    let categsList = null;
    let booksQuan = null;

    if(allBooksQuan) booksQuan=allBooksQuan.length;
    
    const cbShowAllLinks = (ev) => {
        if (!ev) return;
        const elem = ev.target;
        if (!elem) return;
        toogleAllLinks(!allLinks);
        ev.stopPropagation();
    }

    const cbCloseBurger = (ev) => {
        dispatch(showMobileMenu());
        ev.stopPropagation();
    }

    if(categs) {
        categsList = categs.map( item => 
            <NavLink to={`/books/:${item.path}`} 
                key={item.id}  
                className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                data-test-id = {item.key === 0 ? 'burger-books' : ''}
            >
                <li className='text-normal'>{item.name} 
                    <span className='text-light'>{item.id}</span>
                </li>
            </NavLink>
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
                <div className={classNames('Nav-Links-Mobile', {showMobile: allLinks})}>
                    <ul>
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
                    <NavLink to='' >Выход</NavLink>
                </div>
            </div>
        </section>
    )
}