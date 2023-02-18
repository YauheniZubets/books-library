import './orderbutton.css';

export const OrderButton = (props) => (

        <input type='button' 
            value={props.busy ? `Занята до ${props.date}` : `${props.value ? 'Оценить книгу' : `${props.booking ? 'Забронирована' : 'Забронировать'}`}`} 
            className={`bigcard-button ${props.busy && ' bigcard-button-busy'} ${props.wide && ' bigcard-button-wide'} ${props.medium && ' bigcard-button-medium'} ${props.booking && ' bigcard-button-booked'}`} />
    )