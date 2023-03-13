/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { SearchAndFilter } from '../../components/searchbar/search';
import { BigCard } from '../../components/big-card/bigcard';
import { SmallCard } from '../../components/small-card/smallcard';
import { Footer } from '../../components/footer/footer';
import { ErrFetch } from '../../components/errfetch/errfetch';
import { Preloader } from '../../components/preloader/preloader';

import './main-page.css';

export const MainPage = (props) => {

    const {authUser} = useSelector(state => state.authUser);

    const navigate = useNavigate();
    if (!authUser) navigate('/auth');

    const currentLocation = useParams().category?.substring(1); // по url получаем категорию текущую и сравниваем

    const [view, changeView] = useState('tile'); // вид карточек
    const [filteredBooks, setFilteredBooks] = useState(null); // фильтрованный массив книг
    const [rateBooksFromHigh, setRate] = useState(true); // отображение книг по рейтингу
    const [searchValue, setSearchValue] = useState(''); // слово для поиска
    
    
    
    const sortBooksOnRating = (arr) => {
        // console.log('arr: ', arr);
        const arrToSort = [...arr];
        arrToSort.sort((a, b) => {
            return rateBooksFromHigh 
            ? a.rating < b.rating ? 1 : (-1)
            : a.rating < b.rating ? (-1) : 1
        });
        return arrToSort;
    }

    const searchBooksOnWords = (wordToSearch, arr) => {
        const wordToSearchLower = wordToSearch.toLowerCase();
        const arrForSearch = [...arr];
        // console.log('arrForSearch: ', arrForSearch);
        const filteredOnWord = arrForSearch.filter(item => item.title.toLowerCase().indexOf(wordToSearchLower) >= 0);
        // console.log('filteredOnWord: ', filteredOnWord);
        return filteredOnWord;
    }

    const changeWordForSearch = (wordToSearch) => setSearchValue(wordToSearch);

    const anotherView = (choosedView) => {
        if (choosedView !== view) changeView(choosedView);
    }

    const {isLoading, isError} = useSelector(state=>state.allBooksList);
    const bookList = useSelector(state => state.allBooksList.allBooks.payload); // все книги с бэка с редакса
    const categs = useSelector(state=>state.allCategories.allCategories.payload);
    // console.log('categs: ', categs);
    // console.log('bookList: ', bookList);
    // if (bookList) sortBooksOnRating();

    let bigCards = [];
    let smallCards = [];

    const categoryFilter = (category) => bookList.filter(item => item.categories.includes(category));

    const changeCategory = (newCategory) => {
        console.log('newCategory: ', newCategory);
        if (newCategory) {
            const filteredList = categoryFilter(newCategory);
            setFilteredBooks(filteredList);
        } else {
            setFilteredBooks(null);
        }
    }

    useEffect(() => {
    //    console.log('дид маунт Мэйн пэйдж');
       if (currentLocation && categs) {
        const rusCategory = categs.find(item => item.path === currentLocation);
        if (rusCategory && bookList) {
            console.log('работает фильтр useEffect');
            const filteredList = categoryFilter(rusCategory.name);
            setFilteredBooks(filteredList);
        } else {
            setFilteredBooks(null);
        }
       }
    }, [categs, currentLocation]);

    useEffect(() => {
        // console.log('searchvalue: ', searchValue);
        // console.log('filtered books', filteredBooks);
    })
    
    // console.log('render');
    if (bookList) {
        // console.log('bookList: ', bookList);
        // console.log('filteredBooks: ', filteredBooks);
        bigCards = (filteredBooks 
            ? sortBooksOnRating(searchValue ? searchBooksOnWords(searchValue, filteredBooks) : filteredBooks) 
            : sortBooksOnRating(searchValue ? searchBooksOnWords(searchValue, bookList) : bookList))
            .map( item => 
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
                categsArr = {item.categories}
                searchedValue = {searchValue}
            />
        );
        smallCards = (filteredBooks 
            ? sortBooksOnRating(searchValue ? searchBooksOnWords(searchValue, filteredBooks) : filteredBooks) 
            : sortBooksOnRating(searchValue ? searchBooksOnWords(searchValue, bookList) : bookList))
            .map( item => 
            <SmallCard key={item.id}
                title={item.title}
                authors={item.authors} 
                rating = {item.rating} 
                image = {false}
                images = {item.image}  
                bookKey={0}
                year = {item.issueYear}
                booking = {item.booking}
                id= {item.id}
                categsArr = {item.categories}
                searchedValue = {searchValue}
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
            <Navigation toogleLinks = {props.toogleLinks} allLinks = {props.allLinks} changeCategory={changeCategory} />
            <div className='main-filter-and-cards'>
                {
                    bookList && 
                    <SearchAndFilter anotherView={anotherView} view={view} rateBooks={()=> setRate(!rateBooksFromHigh)} searchBooks={changeWordForSearch} />
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
                {
                    filteredBooks && !filteredBooks.length &&
                    <div className='main-cards-no-any-books' data-test-id='empty-category'>
                        В этой категории книг ещё нет
                    </div>
                }
                {
                    (!bigCards.length || !smallCards.length) && searchValue &&
                    <div className='main-cards-no-any-books'  data-test-id='search-result-not-found'>
                        По запросу ничего не найдено
                    </div>
                }
            </div>
        </div>
        <Footer />
    </section>
    )
};
