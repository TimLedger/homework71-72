import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { dishAdd, dishEdit, dishOne } from "../../store/dishesThunk";
import Preloader from '../../components/Preloader/Preloader';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { Dish } from '../../types';
import './DishForm.css';

const DishForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const contact = useAppSelector(state => state.dishes.dish);
  const loading = useAppSelector(state => state.dishes);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [filling, setFilling] = useState<Dish>({
    name: "",
    price: "",
    photo: "",
  });
  const russianToTranslit = (text: string) => {
    const rusToEngMap: {[key: string]: string} = { 
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
      'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
      'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return text.split('').map(char => rusToEngMap[char] || char).join('');
  };

  useEffect(() => {
    if (params.id) {
      dispatch(dishOne(params.id));
      setEditMode(true);
    } else {
      setFilling({
        name: "",
        price: "",
        photo: "",
      });
      setEditMode(false);
    }
  }, [dispatch, params.id]);

  
  useEffect(() => {
      if (editMode && contact) {
        setFilling(contact);
      }
  }, [editMode, contact]);
  
  const dishChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFilling(prevState => ({
          ...prevState,
          [name]: value,
      }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      await dispatch(dishEdit({ id: params.id, data: filling }));
    } else {
      const dishId = russianToTranslit(filling.name).toLowerCase().replace(/\s+/g, '-');
      await dispatch(dishAdd({ id: dishId, data: filling }));
    }
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
              { loading.postLoading || loading.editLoading ? (<Preloader />) : (
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