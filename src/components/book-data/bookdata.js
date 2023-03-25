import { useState } from 'react';
import { useSelector } from 'react-redux';

import { OrderButton } from '../order-button/orderbutton';
import { Stars } from '../stars/stars';
import { Slider } from '../slider/slider';

import feedUser from './img/feeduser.png';
import arrowbot from './img/arrowbotblack.svg';
import arrowup from './img/arrowupblack.svg';
import cat from './img/cat.svg';

import './bookdata.css';
import 'swiper/css';

export const BookData = (props) => {

    const {comments, images} = props;

    const [bookFeeds, toogleBookFeeds] = useState(true);
    

    const cbBookfeeds = () => toogleBookFeeds(!bookFeeds);

    const makingDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    let feeds = null;

    if (comments) {
        feeds = comments.map(item => 
            <div className='book-data-feedback-and-stars' key={item.id}>
                <div className='book-data-feedback'>
                    <div><img src = {feedUser} alt='feed-user' /></div>
                    <div>{item.user.firstName} {item.user.lastName}</div>
                    <div>{makingDate(item.createdAt)}</div>
                </div>
                <Stars widePadding = {true} rating={item.rating} />
                <div className='book-data-feedback-body'>
                    {item.text}
                </div>
            </div>
        )
    }

    return (
        <section className='book-data'>
            <div className='book-data-photo-and-about'>
                <div className='book-data-photo'>
                    {
                        images 
                        ? 
                        <div className='book-data-photo-main-slider'>
                            <Slider images={props.images} imagesLength={props.images.length}  />
                        </div>
                        : 
                        <div className='book-data-photo-nobook'>
                            <img src={cat} alt='no-book' />
                        </div>
                    }
                </div>
                <div className='book-data-about'>
                    <div className='book-data-name text-head'
                        data-test-id='book-title'
                    >{props.title}</div>
                    <div className='book-data-author'>
                        {props.authors[0]}, {props.year}
                    </div>
                    <div className='book-data-order'>
                        <OrderButton wide={true} busy={true} date={12.2023} />
                    </div>
                    <div className='book-data-descr-general'>
                        <div className='book-data-descr-name'>О книге</div>
                        <div className='book-data-descr-body'>
                            <div>
                                {props.description}
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <div className='book-data-descr-general-clone'>
                <div className='book-data-descr-name'>О книге</div>
                <div className='book-data-descr-body'>
                    <div>
                        {props.description}
                    </div>
                </div>  
            </div>
            <div className='book-data-feed-and-rating'>
                <div className='book-data-descr-name book-data-rating'>Рейтинг</div>
                <div className='book-data-stars'>
                    <Stars widePadding = {true} rating={props.rating} />
                    <div className='book-data-value-rating'>{props.rating}</div>
                </div>
                <div className='book-data-descr-name book-data-descr-border'>Подробная информация</div>
                <div className='book-data-descr-main'>
                    <div>
                        <div>
                            <div className='book-data-descr-main-headers'>Издательство</div>
                            <div className='book-data-descr-main-headers'>Год издания</div>
                            <div className='book-data-descr-main-headers'>Страниц</div>
                            <div className='book-data-descr-main-headers'>Переплет</div>
                            <div className='book-data-descr-main-headers'>Формат</div>
                        </div>
                        <div>
                            <div className='book-data-descr-main-body'>{props.publish}</div>
                            <div className='book-data-descr-main-body'>{props.year}</div>
                            <div className='book-data-descr-main-body'>{props.pages}</div>
                            <div className='book-data-descr-main-body'>{props.cover}</div>
                            <div className='book-data-descr-main-body'>{props.format}</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='book-data-descr-main-headers'>Жанр</div>
                            <div className='book-data-descr-main-headers'>Вес</div>
                            <div className='book-data-descr-main-headers'>ISBN</div>
                            <div className='book-data-descr-main-headers'>Изготовитель</div>
                        </div>
                        <div>
                            <div className='book-data-descr-main-body'>{props.categories[0]}</div>
                            <div className='book-data-descr-main-body'>{props.weight}</div>
                            <div className='book-data-descr-main-body'>{props.ISBN}</div>
                            <div className='book-data-descr-main-body'>{props.producer}</div>
                        </div>
                    </div>
                </div>
                <div className='book-data-descr-name book-data-descr-border'>
                    Отзывы
                    <span className='book-data-feed-number'>{comments && comments.length}</span>
                    {
                        bookFeeds 
                        ? <img src={arrowbot} alt='arrowbot' onClick={cbBookfeeds} role='presentation' data-test-id='button-hide-reviews' />
                        : <img src={arrowup} alt='arrowup' onClick={cbBookfeeds} role='presentation' data-test-id='button-hide-reviews' />
                    }
                </div>
                {
                    bookFeeds && 
                    <div className='book-data-feed'>
                        <div className='book-data-feed-all'>
                            {feeds}
                        </div>
                    </div>
                }
                
                <div className='book-data-feedback-button' data-test-id='button-rating'>
                    <OrderButton wide={true} value='Оценить книгу'  />
                </div>
            </div>
        </section>
    )
}