import { useEffect } from "react";
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { orderList } from "../../store/ordersThunk";
import Preloader from "../../components/Preloader/Preloader";
import './OrdersList.css';

const OrdersList = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  const loading = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(orderList());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <div className="container">
        <div className="page-body">
          <div className="menu-inner">
              <h3 className="menu-title">Заказы</h3>
          </div>
          {loading.getLoading  ? (
            <Preloader />
          ) : (
            <div>
              {orders.length < 1 ? (
                <h2>Заказов еще нет!</h2>
              ) : ( 
                orders.map((order) => (
                  <ul className="order-list">                  
                    <li key={order.id} className="order-item">
                      {order.dishes.map((dish) => (
                        <div key={dish.id} className="order-dish">
                          <h4 className="order-name">{dish.name}</h4>
                          <span className="order-amount">X<strong>{dish.amount}</strong></span>
                          <span className="order-price">{dish.price} KGS</span>
                        </div>
                      ))}
                      <div>
                        <p>Доставка: 150 KGS</p>
                        <strong>Всего: KGS</strong>
                        <button>Выполнить</button>
                      </div>
                    </li>
                  </ul>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;