import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
    return (
        <nav className='main-nav'>
            <ul>
                <li>
                    <NavLink to={'/admin/orders'} className={({ isActive }) => isActive ? 'active-link' : 'link'}>Заказы</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dishes'} className={({ isActive }) => isActive ? 'active-link' : 'link'}>Меню</NavLink>
                </li>
            </ul>                       
        </nav>
    );
};

export default Toolbar;