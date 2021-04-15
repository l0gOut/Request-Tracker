import React from 'react';
import jpg from './zXytyU_AChk.jpg';
import Logout from'./klipartz.com.png';
import './Header.css';



function Header() {

    let urlJoin = `${window.location.href}join`

    return (
        <header className='header'>
            <a href={urlJoin} className='logout'><img src={Logout} alt='Logout png'/></a>
            <div>
                <a href='https://vk.com/id367708045' target='_blank' rel="noreferrer">Александр Панов</a>
                <img src={jpg} alt={`jpg don't load is name ${jpg}`} />
            </div>
        </header>
    );
}

export default Header;