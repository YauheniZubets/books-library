import './bookhistory.css';
import slash from './img/slash.svg';

export const BookHistory = (props) => {

    const {categories, title} = props;

    return (
        <section className='book-history'>
            <ul>
                <li>{categories}</li>
                <li>
                    <img src={slash} alt='slash' />
                </li>
                <li>{title}</li>
            </ul>
        </section>
    )
}