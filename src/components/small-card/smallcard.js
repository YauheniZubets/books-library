import { Link, useParams } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import { useDispatch } from 'react-redux';
import { choosedCategory } from '../../redux/choosedcategory-reducer';

import smallBook from './img/book.png';
import catNoBook from '../big-card/img/cat.svg';

import { OrderButton } from '../order-button/orderbutton';
import { Stars } from '../stars/stars';

import './smallcard.css';

export const SmallCard = (props) => {

    const {categsArr, searchedValue} = props;

    const param = useParams();

    const dispatch = useDispatch();

    const cbChoosecategory = () => {
        dispatch(choosedCategory(categsArr));
    }

    return (
        <Link to={`/books/${param.category || 'all'}/${props.id}`} onClick={cbChoosecategory} role='presentation'>
            <section className='smallcard' data-test-id='card'>
                <div className='smallcard-image'>
                    {
                        props.images
                        ? <img src={`https://strapi.cleverland.by${props.images.url}`} alt='smallbook' />
                        : <div className='smallcard-no-book'>
                            <img src={catNoBook} alt='no-book' />
                        </div>
                    }
                </div>
                <div className='smallcard-data'>
                    <div className='smallcard-name'>
                        <Highlighter highlightClassName="YourHighlightClass" 
                            searchWords={[`${searchedValue}`]}
                            textToHighlight={props.title}
                            data-test-id='highlight-matches'
                        />
                    </div>
                    <div className='smallcard-author'>{props.authors[0]}, {props.year}</div>
                    <div className='smallcard-order'>
                        {
                            props.rating 
                            ? <Stars widePadding={true} rating={props.rating} />
                            : <div>ещё нет оценок</div> 
                        }
                        <div>
                            <OrderButton busy={props.busy} date={props.date} medium={true} booking={props.booking}  />
                        </div>
                    </div>
                </div>
            </section>
        </Link>
    )
}