import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { dishDelete, dishList } from "../../store/dishesThunk";
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import Preloader from "../../components/Preloader/Preloader";
import { Link } from "react-router-dom";
import './DishesList.css';

const DishesList = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const loading = useAppSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(dishList());
  }, [dispatch]);

  const deleteDish = async (id: string) => {
    await dispatch(dishDelete(id));
    await dispatch(dishList());
  };

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <div className="page-body">
          <div className="menu-inner">
            <h3 className="menu-title">Меню</h3>
            <Link to="/admin/add-dish" className="menu-add">Добавить</Link>
          </div>
          {loading.getLoading ? (
            <Preloader />
          ) : (
            dishes.map((dish) => (
              <ul className="dish-list">
                <li key={dish.id} className="dish-item">
                  <div className="dish-item-inner">
                    <div className="dish-img-container">
                      <img className="dish-img" src={dish.photo ? dish.photo : '../../../src/assets/unknown-dish.png'} alt={dish.name} />
                    </div>
                    <h3 className="dish-name">{dish.name}</h3>
                  </div>
                  <div className="dish-item-inner">
                    <span className="dish-price">{dish.price} KGS</span>
                    <div className="dish-btns">
                      <Link className="dish-btn" to={'/admin/' + dish.id + '/edit'}>Изменить</Link>
                      <button className="dish-btn delete-btn" onClick={() => deleteDish(dish.id)}>
                        {loading.deleteLoading && <Preloader />}Удалить
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DishesList;