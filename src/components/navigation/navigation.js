/*eslint-disable*/
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { authClearUser } from '../../redux/auth-user-reducer';

import arrowTop from './img/arrow-top.svg';
import arrowBot from './img/arrow-bot.svg';

import './navigation.css';


export const Navigation = (props) => {

    const [clickedCategory, setColorAllLinks] = useState(true);

    const dispatch = useDispatch();

    const categs = useSelector(state=>state.allCategories.allCategories.payload);
    
    const allBooks = useSelector(state=>state.allBooksList.allBooks.payload); // количество всех книг

    const arrOfQuan = []; // массив количесва книг по категориям
    if (categs && allBooks) {
        categs.forEach(category => {
            const filteredBooksArr = allBooks.filter(item => item.categories.includes(category.name));
            arrOfQuan.push(filteredBooksArr.length);
        });
    }

    let categsList = null;

    const loc = useLocation();

    useEffect(() => loc.pathname.substring(1, 6)=== 'books' ? setColorAllLinks(true) : setColorAllLinks(false), [loc.pathname]) // выделение активного класса

    const cbShowAllLinks = (ev) => {
        if (!ev) return;
        const elem = ev.target;
        if (!elem) return;
        props.toogleLinks();
        ev.stopPropagation();
    }

    const cbCurrentCategory = (ev) => {
        if (!ev) return;
        const current = ev.target;
        if (!current) return;
        let curCategory = null;
        if (current.tagName === 'LI') {
            curCategory = current.getAttribute('value');
            props.changeCategory(curCategory);
        }
    }

    const cbLogOut = () => {
        const loggedTokenUserFromLocal = localStorage.getItem('jwt');
        if (loggedTokenUserFromLocal) {
            localStorage.removeItem('jwt');
            dispatch(authClearUser());
        }
    }

    if (categs) {
        categsList = categs.map( (item, index) => 
            <div key={item.id}>
                <NavLink to={`/books/:${item.path}`} 
                     
                    className={({ isActive }) => isActive ? 'coloredLink' : undefined}
                >
                    <li className='text-normal' value = {item.name} data-test-id={`navigation-${item.path}`}>
                        {item.name} 
                    </li>
                </NavLink>
                <span className='text-light' data-test-id={`navigation-book-count-for-${item.path}`}
                >
                    {arrOfQuan[index]}
                </span>
            </div>
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
                    <ul onClick={cbCurrentCategory} role='presentation'> 
                        {
                            categs && 
                            <div>
                                <NavLink to='/books/:all' className={({ isActive }) => isActive ? 'coloredLink' : undefined} 
                                    data-test-id='navigation-books'
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
                <NavLink to='/auth' onClick={cbLogOut} data-test-id='exit-button'>Выход</NavLink>
            </div>
        </section>
    )
}