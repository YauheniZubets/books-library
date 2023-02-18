import fullStar from './img/fullstar.png';
import emptyStar from './img/emptystar.png';

import './stars.css';

export const Stars = (props) => {

    const {rating} = props;
    const arr = [];
    const sortStars = (rating, arr, i) => rating >= i ? arr.push(true) : arr.push(false);

    for (let i = 1; i <= 5; i++) {
        sortStars(rating, arr, i);
    }

    let a = 0;

    const stars = arr.map(( item, index, array ) => {
        a += 1;
        return <img src={item ? fullStar : emptyStar} alt='star' key={a} />
    }
    )

    return (

    <div className={`stars ${props.widePadding && 'stars-wide-padding'}`}>
        {stars}
    </div>
    )
}