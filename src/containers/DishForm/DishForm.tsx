import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import './DishForm.css';

const DishForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      
    } else {
      
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
                <div className='form-inputs'>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder='Название'
                    required
                  />
                  <input
                    id="price"
                    type="number"
                    name="price"
                    className="form-input"
                    placeholder='Цена'
                    required
                  />
                  <input
                    id="photo"
                    type="url"
                    name="photo"
                    className="form-input"
                    placeholder='Ссылка на фото блюда'
                  />
                </div>
              </div>
                <div className='form-btns'>
                  <button type="submit" className='form-btn'>
                    {params.id ? 'Сохранить изменения' : 'Создать Блюдо'}
                  </button>
                  <NavLink className='form-btn' to="/admin/dishes">
                    Вернуться
                  </NavLink>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishForm;