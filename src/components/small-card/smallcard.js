import { Link, useParams } from 'react-router-dom';

import './smallcard.css';
import smallBook from './img/book.png';
import catNoBook from '../big-card/img/cat.svg';

import { OrderButton } from '../order-button/orderbutton';
import { Stars } from '../stars/stars';

export const SmallCard = (props) => {

    const param = useParams();

    return (
        <Link to={`/book/${param.category || 'all'}/:${props.bookKey}`}>
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
                    <div className='smallcard-name'>{props.title}</div>
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