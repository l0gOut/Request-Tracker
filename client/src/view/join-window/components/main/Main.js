import React from 'react';
import './Main.css'

function Main() {
    return (
        <div className='join-block-form'>
            <input placeholder='Логин' type='text'/>
            <input placeholder='Пароль' type='password'/>
            <button>Войти</button>
        </div>
    )
}

export default Main;