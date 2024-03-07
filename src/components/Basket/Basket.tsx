import React, {useState} from "react";
import { Dishes, CounterBasket } from "../../types";
import './Basket.css';

interface Props {
  basket: CounterBasket[];
  removeToBasket: (id: string) => void;
  addToBasket: (dish: Dishes) => void;
}

const Basket: React.FC<Props> = ({ basket, removeToBasket, addToBasket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = basket.reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.amount;
  }, 150);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Корзина</button>

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
            <div className="modal-btn-container">
            </div>
          </div>
          <div className='modal-backdrop' onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default Basket;