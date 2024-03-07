import React, {useState} from "react";
import { Dishes, CounterBasket } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ordersAdd } from "../../store/ordersThunk";
import BtnSpinner from "../Preloader/BtnSpinner";
import './Basket.css';

interface Props {
  basket: CounterBasket[];
  removeToBasket: (id: string) => void;
  addToBasket: (dish: Dishes) => void;
  onDelete: (id: string) => void;
}

const Basket: React.FC<Props> = ({ basket, removeToBasket, addToBasket, onDelete }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loading = useAppSelector((state) => state.orders);
  const totalAmount = basket.reduce((total, dish) => total + dish.amount, 0);
  const totalPrice = basket.reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.amount;
  }, 150);

  let emptyBasket = false;

  const onOrder = async () => {
    await dispatch(ordersAdd(basket));
    setIsModalOpen(false);
    basket.forEach((dish) => {
      onDelete(dish.id);
    });
  };

  if (basket.length < 1) {
    emptyBasket = true;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Корзина <span>{totalAmount}</span></button>

      {isModalOpen && (
        <div>
          <div className="modal">
            <div className="top-inner">
              <button className="modal-close" onClick={closeModal}></button>
            </div>
            <h4 className="modal-title">Корзина</h4>
            <span className="delivery-price">Доставка: 150 KGS</span>
            <h4>Итого: {totalPrice} KGS</h4>
            <ul className="modal-list">
              {basket.map((dish) => (
                <li key={dish.id} className="modal-item">
                  <div className="modal-top-item">
                    <div className="modal-img-container">
                      <img className="modal-img" src={dish.photo ? dish.photo : '../../../src/assets/unknown-dish.png'} alt={dish.name} />
                    </div>
                    <h4 className="modal-name">{dish.name}</h4>
                  </div>
                  <div className="modal-bottom-item">
                    <span className="modal-price">{dish.price} KGS</span>
                    <div className="amount-container">
                      <button className="modal-btn-minus" onClick={() => removeToBasket(dish.id)}>-</button>
                      <span className="modal-amount">{dish.amount}</span>
                      <button className="modal-btn-plus"  onClick={() => addToBasket(dish)}>+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="modal-btn-order" disabled={emptyBasket} onClick={onOrder}>
              {loading.postLoading ? <BtnSpinner /> : 'Заказать'} 
            </button>
          </div>
          <div className='modal-backdrop' onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default Basket;