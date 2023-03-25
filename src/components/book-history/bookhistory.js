import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import slash from './img/slash.svg';
import './bookhistory.css';

export const BookHistory = (props) => {

    const params = useParams().category.substring(1);

    const {category, title} = props;

    let categoryEng = '';
    const categs = useSelector(state=>state.allCategories.allCategories.payload);
    if (categs) categoryEng = categs.find(item => item.name === category);
    
    let bookTitle = '';
    if (title) bookTitle=title.title;

    return (
        <section className='book-history'>
            <ul>
                <li>
                    <Link to={`/books/:${ params === 'all' ? 'all' : (categoryEng && categoryEng.path) || 'all'}`}
                        data-test-id='breadcrumbs-link'
                    >
                        { params ==='all' ? 'Все книги' : category || 'Все книги'}
                    </Link>
                </li>
                <li>
                    <img src={slash} alt='slash' />
                </li>
                <li data-test-id='book-name'>{bookTitle}</li>
            </ul>
        </section>
    )
}