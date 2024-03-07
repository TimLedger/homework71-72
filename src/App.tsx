import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import DishForm from './containers/DishForm/DishForm';
import DishesList from './containers/DishesList/DishesList';
import OrdersList from './containers/OrdersList/OrdersList';
import NotFound from './containers/NotFound/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/admin" element={<OrdersList />} />
        <Route path="/admin/dishes" element={<DishesList />} />
        <Route path="/admin/orders" element={<OrdersList />} />
        <Route path="/admin/add-dish" element={<DishForm />} />
        <Route path="/admin/:id/edit" element={<DishForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;