import React from 'react';
import { NavLink } from 'react-router-dom';
import Basket from '../Basket/Basket';
import { Dishes, CounterBasket } from "../../types";
import './Header.css';

interface Props {
    basket: CounterBasket[];
    removeToBasket: (id: string) => void;
    addToBasket: (dish: Dishes) => void;
    onDelete: (id: string) => void;
}

const Header: React.FC<Props> = ({ basket,  removeToBasket, addToBasket, onDelete }) => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header-inner">
                    <NavLink className={'logo'} to="/" end>
                        <h3>Пицца</h3>
                    </NavLink>
                    <Basket removeToBasket={removeToBasket} basket={basket} addToBasket={addToBasket} onDelete={onDelete} />
                </div>
            </div>
        </header>
    );
};

export default Header;
