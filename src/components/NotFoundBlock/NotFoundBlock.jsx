import React from 'react';
import cvg from './../../assets/page_not_found.svg'
import './NotFoundBlock.css'

const NotFoundBlock = () => {
    return (
        <div className='notFoundBlock'>
            <img 
                src={cvg} 
                alt="Страница не найдена" 
                width='400px'/>
            <div>
                <h1>Ой! Такой страницы не существует :(</h1>
                <p>Попробуйте поискать что-нибудь другое</p>
            </div>
        </div>
    );
};

export default NotFoundBlock;