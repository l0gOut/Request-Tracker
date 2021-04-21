import React from 'react';
import './Main.css'

function Main() {
    return (
        <form method='post' className='join-block-form'>
            <input placeholder='Логин' type='text' autoComplete='username'/>
            <input placeholder='Пароль' type='password' autoComplete='current-password'/>
            <input type="submit" value="Войти"/>
        </form>
    )
}

export default Main;