import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import { categories } from './categories';

import arrowTop from './img/arrow-top.svg';
import arrowBot from './img/arrow-bot.svg';

import './navigation.css';


export const Navigation = (props) => {

    const [clickedCategory, setColorAllLinks] = useState(true);

    const categs = useSelector(state=>state.allCategories.allCategories.payload);

    const allBooksQuan = useSelector(state=>state.allBooksList.allBooks.payload);

    let categsList = null;
    let booksQuan = null;

    if(allBooksQuan) booksQuan=allBooksQuan.length;

    const loc = useLocation();

    useEffect(() => loc.pathname.substring(1, 6)=== 'books' ? setColorAllLinks(true) : setColorAllLinks(false), [loc.pathname])

    const cbShowAllLinks = (ev) => {
        if (!ev) return;
        const elem = ev.target;
        if (!elem) return;
        props.toogleLinks();
        ev.stopPropagation();
    }

    if (categs) {
        categsList = categs.map( item => 
            <NavLink to={`/books/:${item.path}`} 
                key={item.id} 
                className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                data-test-id = {item.key === 0 ? 'navigation-books' : ''}
            >
                <li className='text-normal'>{item.name} 
                    <span className='text-light'> {item.id}</span>
                </li>
            </NavLink>
        )
    }

    return (
        <section className='navigation'>
            <div className={classNames('navigation-name-cover', {[`navigation-wide-padding`]: !props.allLinks})}
                onClick={cbShowAllLinks}
                role='presentation'
                data-test-id='navigation-showcase'
            >
                <div className={classNames('navigation-name', {[`coloredLink`]: clickedCategory})}>Витрина книг</div>
                <div><img src={props.allLinks ? arrowBot : arrowTop} alt='arrow' /></div>
            </div>
            <div className={classNames('navigation-all', {[`navigation-hidden`]:!props.allLinks})}>
                <div className='navigation-list'>
                    <ul> 
                        <NavLink to='/books/all' className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                            // data-test-id = {item.key === 0 ? 'navigation-books' : ''}
                        >
                            <li className='text-normal'>Все книги 
                                <span className='text-light'> {booksQuan}</span>
                            </li>
                        </NavLink>
                        {categsList}
                    </ul>
                </div>
            </div>
            <div className='navigation-rules'>
                <NavLink to='/rules' className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                    data-test-id='navigation-terms'
                >
                    Правила пользования
                </NavLink>
            </div>
            <div className='navigation-rules'>
                <NavLink to='/agreement' className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                    data-test-id='navigation-contract'
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
        </section>
    )
}