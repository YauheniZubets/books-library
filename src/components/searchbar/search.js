import { useState } from 'react';
import classNames from 'classnames';

import searchLogo from './img/Search-orange.svg';
import searchLogoBl from './img/Icon_Action.svg';
import sortLogo from './img/Sort_Action.svg';
import sortLow from './img/Sort-low.svg';
import tileLogo from './img/Plit_Action.svg';
import rowsLogo from './img/Rows_Action.svg';
import tileLogoGrey from './img/Plit_Action_Grey.svg';
import rowsLogoWhite from './img/Rows_Action_White.svg';
import close from './img/close.svg';

import './search.css';

export const SearchAndFilter = (props) => {

    const [fullSearchInput, toogleSearchInput] = useState(false);
    const [sortHighView, setSortHighView] = useState(true);
    const [searchInp, setSearchInp] = useState('');
    const [focusedInp, setFocusedInp] = useState(false);

    const cbChangeView = (ev) => {
        if (!ev) return;
        const elem = ev.target;
        if (!elem) return;
        const current = elem.value || elem.alt;
        if (current) props.anotherView(current);
    }

    const cbShowSearchInput = (ev) => {
        if (!ev) return;
        const elem = ev.target;
        if (!elem) return;
        if ((elem.alt === 'search' || elem.alt === 'close')  && window.innerWidth <= 910) {
            toogleSearchInput(!fullSearchInput);
        }
    }

    const cbSortClicked = () => {
        props.rateBooks();
        setSortHighView(!sortHighView);
    }

    const cbColorInput = () => setFocusedInp(true);
    const cbBreakColorInput = () => setFocusedInp(false);

    const cbSearchInput = (ev) => {
        if (!ev) return;
        const current = ev.target;
        if (!current) return;
        const wordToSearch = current.value;
        setSearchInp(wordToSearch);
        props.searchBooks(wordToSearch);
    }

    return (
        <section className='searchbar'>
            <div className={classNames('searchbar-input-and-sort', {[`searchbar-width-full`]:fullSearchInput})}>
                <div className={classNames('searchbar-outer-input',{[`searchbar-outer-full-input`]:fullSearchInput})}
                    onClick={cbShowSearchInput}
                    role='presentation'
                    data-test-id='button-search-open'
                >
                    {!fullSearchInput && (focusedInp ? <img src={searchLogo} alt='search'/> : <img src={searchLogoBl} alt='search'/>)}
                    <input type='text' placeholder='Поиск книги или автора…'
                        data-test-id='input-search'
                        value={searchInp}
                        onChange={cbSearchInput}
                        onFocus={cbColorInput}
                        onBlur={cbBreakColorInput}
                    />
                    {fullSearchInput && <img src={close} alt='close' onClick={cbShowSearchInput} role='presentation' data-test-id='button-search-close' />}
                </div>
                <div className={classNames('searchbar-outer-input searchbar-small', {[`all-no-display`]:fullSearchInput})}
                    onClick={cbSortClicked} role='presentation'>
                    {
                        sortHighView 
                        ? <div><img src={sortLogo} alt='sort-high'/></div>
                        : <div><img src={sortLow} alt='sort-low'/></div>
                    }
                    <button type='button' value='По рейтингу' data-test-id='sort-rating-button'
                        className='sort-button'
                    >
                        По рейтингу
                    </button>
                </div>
            </div>
            <div className={classNames('searchbar-outer-view', {[`all-no-display`]:fullSearchInput})}>
                <button type='button' className= {`searchbar-view ${props.view === 'rows' && ' searchbar-white-back' }`} onClick={cbChangeView} value='tile' data-test-id='button-menu-view-window'>
                    <img src={props.view === 'tile' ? tileLogo : tileLogoGrey} alt='tile'/>
                </button>
                <button type='button' className={`searchbar-view ${props.view === 'tile' && ' searchbar-white-back' }`} value='rows' onClick={cbChangeView} data-test-id='button-menu-view-list'>
                    <img src={props.view === 'tile' ? rowsLogo : rowsLogoWhite} alt='rows'/>
                </button>
            </div>
        </section>
    )
}