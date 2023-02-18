import { Link, useLocation, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { choosedCategory } from '../../redux/choosedcategory-reducer';

import { OrderButton } from '../order-button/orderbutton';
import { Stars } from '../stars/stars';

import bookImage from './img/book.png';
import catNoBook from './img/cat.svg';

import './bigcard.css';

export const BigCard = (props) => {

    const {categsArr} = props;
    const loc = useLocation();

    const param = useParams();
    const dispatch = useDispatch();

    const cbChoosecategory = () => {
        dispatch(choosedCategory(categsArr));
    }
   
    return (
        <Link to={`/books/${param.category || 'all'}/${props.id}`} onClick={cbChoosecategory} role='presentation'>
            <section className='bigcard' data-test-id='card'  >
                <div className='bigcard-image-wrapper'>
                    {
                        props.images 
                        ? <img src={`https://strapi.cleverland.by${props.images.url}`} alt='book' />
                        : <div className='bigcard-no-book'>
                            <img src={catNoBook} alt='no-book' />
                        </div>
                    }
                </div>
                <div className='bigcard-stars-or-empty'>
                    {
                        props.rating 
                        ? <Stars rating={props.rating} />
                        : 'ещё нет оценок' 
                    }  
                </div>
                <div className='bigcard-book-name'>{props.title}</div>
                <div className='bigcard-author'>{props.authors[0]}, {props.year}</div>
                <div>
                    <OrderButton busy={props.busy} date={props.date} booking={props.booking} />
                </div>
            </section>
        </Link>
    )
}