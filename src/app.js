import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { showMobileMenu } from './redux/toolkit-reducer';
import { axiosStart } from './saga/books-saga';
import { axiosCategoriesStart } from './saga/categories-saga';

import { MainPage } from './pages/main';
import { BookPage } from './pages/book';
import { RulesPage } from './pages/rules';
import { Agreement } from './pages/agreement';
import { RegistrationPage } from './pages/registration';
import { RegistrationNewUserPage } from './pages/registration-new-user';
import { ForgotPassPage } from './pages/forgot-pass';

export const App = () => {

    const [allLinks, toogleAllLinks] = useState(true);

    const dispatch = useDispatch();

    const mobMenu = useSelector(state => state.toolkit.showMobileMenu);

    const toogleLinks = () => toogleAllLinks(!allLinks);

    const cbCloseBurger = (ev) => {
        const elem = ev.target;
        if (mobMenu && !elem.closest('.Mobile-Menu')) dispatch(showMobileMenu());
    };

    const loggedTokenUserFromLocal = localStorage.getItem('jwt');

    useEffect(()=> {
        dispatch(axiosStart());
        dispatch(axiosCategoriesStart());
    }, [dispatch]);

    return (
        <div onClick={cbCloseBurger} role='presentation' data-test-id='auth'>
            <HashRouter>
                <Routes>
                    <Route path='/' exact={true} element={<Navigate to={loggedTokenUserFromLocal ? '/books/all' : '/auth'} />} />
                    <Route path='/books/all' element={<MainPage allLinks={allLinks} toogleLinks={toogleLinks} />} />
                    <Route path='/books/:category' element={<MainPage allLinks={allLinks} toogleLinks={toogleLinks}  />} />
                    <Route path='/books/:category/:numb' element={<BookPage  />} />
                    <Route path='/rules' element={<RulesPage allLinks={allLinks} toogleLinks={toogleLinks}  />} />
                    <Route path='/agreement' element={<Agreement allLinks={allLinks} toogleLinks={toogleLinks}  />} />
                    <Route path ='/auth' element={<RegistrationPage />} />
                    <Route path ='/registration' element={<RegistrationNewUserPage />} />
                    <Route path ='/forgot-pass' element={<ForgotPassPage />} />
                </Routes>
            </HashRouter>
        </div>
    )
}