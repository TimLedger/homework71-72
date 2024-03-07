import React from 'react';
import { NavLink } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import './AdminHeader.css';

const Header: React.FC = () => {
    return (
        <header className='admin-header'>
            <div className="container">
                <div className="header-inner">
                    <NavLink className={'admin-logo'} to="/admin" end>
                        <h3>Пицца</h3>
                    </NavLink>
                    <Toolbar />
                </div>
            </div>
        </header>
    );
};

export default Header;
