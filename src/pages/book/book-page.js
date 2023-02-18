import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { BookHistory } from '../../components/book-history/bookhistory';
import { BookData } from '../../components/book-data/bookdata';
import { ErrFetch } from '../../components/errfetch/errfetch';
import { Preloader } from '../../components/preloader/preloader';

import { threeBooks } from './3books';
import { axiosOneBookStart } from '../../saga/book-id-saga';

import './book-page.css';


export const BookPage = (props) => {

    const location = useParams();

    const arrCategories = useSelector(state=>state.choosedCategory.choosedCategory.payload);
    let firstCategory = null;
    if (arrCategories) [firstCategory] = arrCategories;
    
    const lastLoc = location.numb;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(axiosOneBookStart(lastLoc))
    }, [dispatch, lastLoc]);
    
    const fetchedBook = useSelector(state => state.book.book.payload);
    const {isLoading, isError} = useSelector(state=>state.book);

    const book = threeBooks.find(item => item.key === +lastLoc[lastLoc.length-1]);

    return (
        <section className='book-page'>
            {
                isError &&
                <ErrFetch />
            }
            {isLoading && <Preloader />}
            <div className='main-page'><Header isMenuOpen={props.isMenuOpen} clickCross={props.clickCross} /></div>
            <BookHistory title={fetchedBook} categories={firstCategory}  />
        {
            fetchedBook ?
            <div className='main-page'>
                <BookData book={book || ''} 
                    title={fetchedBook.title}
                    authors={fetchedBook.authors}
                    year={fetchedBook.issueYear}
                    images={fetchedBook.images}
                    description={fetchedBook.description}
                    rating={fetchedBook.rating}
                    publish={fetchedBook.publish}
                    pages={fetchedBook.pages}
                    cover={fetchedBook.cover}
                    format={fetchedBook.format}
                    categories={fetchedBook.categories}
                    weight={fetchedBook.weight}
                    ISBN={fetchedBook.ISBN}
                    producer={fetchedBook.producer}
                    comments={fetchedBook.comments}
                />
            </div>
            : <div className='main-page book-page' />
        }
            <div className='main-page'><Footer /></div>
        </section>
    )
}
    
