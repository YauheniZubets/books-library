import './footer.css';
import facebookLogo from './img/facebook.svg';
import instLogo from './img/instagram.svg';
import vkLogo from './img/vk.svg';
import linkLogo from './img/linkedin.svg';

export const Footer = () => {
    const a = 5;

    return (
        <section className='footer'>
            <div>© 2020-2023 Cleverland. Все права защищены.</div>
            <div className='footer-images'>
                <img src={facebookLogo} alt='facebook' />
                <img src={instLogo} alt='instagram' />
                <img src={vkLogo} alt='vk' />
                <img src={linkLogo} alt='linkedin' />
            </div>
        </section>
    )
}