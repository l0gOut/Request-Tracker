import React from 'react';
import './Menu.css';

function Menu({ templateData}) {
    return (
        <div className='menu'>
            <div className='show-templates'>
                <div className='template-header'>
                    <h1>Выберите шаблон для вашей заявки</h1>
                </div >
                <div className='templates-container'>
                    {templateData.map((value, index) => {
                        return (
                            <div className='template-block' key={ index }>
                                <div className='template-block-header'>
                                    <h3>{value.name}</h3>
                                </div>
                                <div className='template-description'>
                                    <p>{value.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='create-application'>
                    <div className='create-application-header'>
                        <h1>Создание индивидуальной заявки</h1>
                    </div>
                    <div className='create-application-form'>
                        <input type='text' maxlength='40' placeholder='Введите имя заявки (не больше 40 символов)'/>
                        <textarea placeholder='Здесь пишите описание проблемы (как можно более подробно)'></textarea>
                        <button>Отправить</button>
                    </div>
            </div>
        </div>
    )
}

export default Menu;