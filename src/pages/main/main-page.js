import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { SearchAndFilter } from '../../components/searchbar/search';
import { BigCard } from '../../components/big-card/bigcard';
import { SmallCard } from '../../components/small-card/smallcard';
import { Footer } from '../../components/footer/footer';
import { ErrFetch } from '../../components/errfetch/errfetch';

import './main-page.css';
import { Preloader } from '../../components/preloader/preloader';

export const MainPage = (props) => {

    const [view, changeView] = useState('tile');

    const anotherView = (choosedView) => {
        if (choosedView !== view) changeView(choosedView);
    }

    const {isLoading, isError} = useSelector(state=>state.allBooksList);
    const bookList = useSelector(state => state.allBooksList.allBooks.payload);
    const globalState = useSelector(state => state)
    // console.log('bookList: ', globalState);

    let bigCards = null;
    let smallCards = null;

    if (bookList) {
        bigCards = bookList.map( item => 
            <BigCard key={item.id}
                title={item.title}
                authors={item.authors} 
                rating = {item.rating} 
                image = {false}
                images = {item.image}  
                bookKey={0}
                year = {item.issueYear}
                booking = {item.booking}
                id= {item.id}
            />
        );
        smallCards = bookList.map( item => 
            <SmallCard key={item.id}
                title={item.title}
                authors={item.authors} 
                rating = {item.rating} 
                image = {false}
                images = {item.image}  
                bookKey={0}
                year = {item.issueYear}
                booking = {item.booking}
                id= {props.id}
            />
        )
    }

    return (
    <section className='main-page'>
        {
            isError &&
            <ErrFetch />
        }
        <Header isMenuOpen={props.isMenuOpen} clickCross={props.clickCross}  />
        <div className='main-nav-and-data'>
            {
                isLoading &&
                <Preloader />
            }
            <Navigation toogleLinks = {props.toogleLinks} allLinks = {props.allLinks} />
            <div className='main-filter-and-cards'>
                {
                    bookList && 
                    <SearchAndFilter anotherView={anotherView} view={view} />
                }
                {
                    view === 'tile' &&
                    <div className='main-cards'>
                        {bigCards}
                    </div>
                }
                {
                    view === 'rows' &&
                    <div className='main-cards-small'>
                        {smallCards}
                    </div>
                }
            </div>
        </div>
        <Footer />
    </section>
    )
};
