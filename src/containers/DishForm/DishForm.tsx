import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {dishAdd } from "../../store/dishesThunk";
import Preloader from '../../components/Preloader/Preloader';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { Dish } from '../../types';
import './DishForm.css';

const DishForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.dishes);
  const dispatch = useAppDispatch();
  const [filling, setFilling] = useState<Dish>({
    name: "",
    price: "",
    photo: "",
  });
  
  const dishChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFilling(prevState => ({
          ...prevState,
          [name]: value,
      }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(dishAdd(filling));
    navigate('/admin');
  };

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <div className="page-body">
          <div className="form-frame">
            <form onSubmit={onFormSubmit} autoComplete="off" className="form">
              <div className='form-content'>
              <div className="form-img-container">
                <img className="form-img" src={filling.photo ? filling.photo : '../../../src/assets/unknown-dish.png'} alt={filling.name}/>
              </div>
                <div className='form-inputs'>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={filling.name}
                    onChange={dishChanged}
                    className="form-input"
                    placeholder='Название'
                    required
                  />
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={filling.price}
                    onChange={dishChanged}
                    className="form-input"
                    placeholder='Цена'
                    required
                  />
                  <input
                    id="photo"
                    type="url"
                    name="photo"
                    value={filling.photo}
                    onChange={dishChanged}
                    className="form-input"
                    placeholder='Ссылка на фото блюда'
                  />
                </div>
              </div>
              { loading.postLoading ? (<Preloader />) : (
                <div className='form-btns'>
                  <button type="submit" className='form-btn'>
                    {params.id ? 'Сохранить изменения' : 'Создать Блюдо'}
                  </button>
                  <NavLink className='form-btn' to="/admin/dishes">
                    Вернуться
                  </NavLink>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishForm;