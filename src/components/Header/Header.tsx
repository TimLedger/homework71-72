import React from 'react';
import { NavLink } from 'react-router-dom';
import Basket from '../Basket/Basket';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header-inner">
                    <NavLink className={'logo'} to="/" end>
                        <h3>Пицца</h3>
                    </NavLink>
                    <Basket />
                </div>
            </div>
        </header>
    );
};

export default Header;
