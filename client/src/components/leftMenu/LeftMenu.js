import React from 'react';
import './LeftMenu.css'

function LeftMenu({ templateChange, createTemplate }) {

    return (
        <div className='left-menu'>
            <input type='radio' name='selection' id='templates' onChange={ templateChange }/>
            <input type='radio' name='selection' id='create-template' onChange={ createTemplate }/>
            <label htmlFor='templates'>Создать заявку из существующих шаблонов</label>
            <label htmlFor='create-template'>Создать индивидуальную заявку</label>
        </div>
    );

}

export default LeftMenu;