import React from 'react';
import jpg from './zXytyU_AChk.jpg';
import './Header.css';


function Header() {
    return (
        <header className='header'>
            <a href='https://vk.com/id367708045' target='_blank' rel="noreferrer">Александр Панов</a>
            <img src={jpg} alt={`jpg don't load is name ${jpg}`} />
        </header>
    );
}

export default Header;