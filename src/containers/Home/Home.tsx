import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { dishList } from "../../store/dishesThunk";
import { Dishes, CounterBasket } from "../../types";
import Header from '../../components/Header/Header';
import Preloader from "../../components/Preloader/Preloader";
import './Home.css';

const Home = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector((state) => state.dishes.dishes);
  const loading = useAppSelector((state) => state.dishes);
  const [basket, setBasket] = useState<CounterBasket[]>([]);

  useEffect(() => {
    dispatch(dishList());
  }, [dispatch]);

  const addToBasket = (dish: Dishes) => {
    const currentIndex = basket.findIndex((item) => item.id === dish.id);

    if (currentIndex !== -1) {
      const basketCopy = [...basket];
      const prevAmount = basketCopy[currentIndex].amount;
      basketCopy.splice(currentIndex, 1);
      setBasket([...basketCopy, { ...dish, amount: prevAmount + 1 }]);
    } else {
      setBasket((prevState) => [
        ...prevState,
        {
          ...dish,
          amount: 1,
        },
      ]);
    }
  };

  const removeToBasket = (id: string) => {
    const currentIndex = basket.findIndex((item) => item.id === id);
  
    if (currentIndex !== -1) {
      const basketCopy = [...basket];
      const prevAmount = basketCopy[currentIndex].amount;
      
      if (prevAmount === 1) {
        basketCopy.splice(currentIndex, 1);
      } else {
        basketCopy.splice(currentIndex, 1, { ...basketCopy[currentIndex], amount: prevAmount - 1 });
      }
      
      setBasket(basketCopy);
    }
  };
  
  return (
    <div>
      <Header removeToBasket={removeToBasket} basket={basket} addToBasket={addToBasket} />
      <div className="container">
        <div className="page-body">
          <h3 className="home-title">Блюда</h3>
          {loading.getLoading ? (
            <Preloader />
          ) : (
            <div>
              {dishes.length < 1 ? (
                <h2>Блюд пока нет!</h2>
              ) : (
                dishes.map((dish) => (
                  <ul className="home-list">
                    <li key={dish.id} className="home-item">
                      <div className="home-item-inner">
                        <div className="home-img-container">
                          <img className="home-img" src={dish.photo ? dish.photo : '../../../src/assets/unknown-dish.png'} alt={dish.name} />
                        </div>
                        <h3 className="home-name">{dish.name}</h3>
                      </div>
                      <div className="home-item-inner">
                        <strong className="home-price">{dish.price} KGS</strong>
                        <button className="home-btn" onClick={() => addToBasket(dish)}>В корзину</button>
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

export default Home;