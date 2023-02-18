import './bookhistory.css';
import slash from './img/slash.svg';

export const BookHistory = (props) => {

    const {categories, title} = props;
    let bookTitle = '';
    if (title) bookTitle=title.title;

    return (
        <section className='book-history'>
            <ul>
                <li>{categories || 'Все книги'}</li>
                <li>
                    <img src={slash} alt='slash' />
                </li>
                <li>{bookTitle}</li>
            </ul>
        </section>
    )
}