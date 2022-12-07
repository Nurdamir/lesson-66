import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import NewDish from "./containers/NewDish/NewDish";
import type {ApiDishesList, CartDish, Dish} from "./types";
import Checkout from "./containers/Checkout/Checkout";
import CustomerForm from "./containers/CustomerForm/CustomerForm";
import axiosApi from "./axiosApi";
import EditDish from "./containers/EditDish/EditDish";

function App() {
  const location = useLocation();

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true); // 1
      const dishesResponse = await axiosApi.get<ApiDishesList | null>('/dishes.json'); // 2
      const dishes = dishesResponse.data; // 3

      if (!dishes) {
        setDishes([]);
        return; // 4
      }

      const newDishes: Dish[] = Object.keys(dishes).map(id => {
        const dish = dishes[id];
        return {
          ...dish,
          id
        };
      }); // 5

      setDishes(newDishes); // 6
    } finally {
      setLoading(false); // 7
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchDishes();
    }
  }, [location, fetchDishes])


  const addDishToCart = (dish: Dish) => {
    setCartDishes(prev => {
      const existingIndex = prev.findIndex(item => {
        return item.dish === dish;
      });

      if (existingIndex !== -1) {
        const itemsCopy = [...prev];
        const itemCopy = {...prev[existingIndex]};
        itemCopy.amount++;
        itemsCopy[existingIndex] = itemCopy;
        return itemsCopy;
      }

      return [...prev, {dish, amount: 1}];
    });
  };

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={(
            <Home
              dishesLoading={loading}
              dishes={dishes}
              addToCart={addDishToCart}
              cartDishes={cartDishes}
              fetchDishes={fetchDishes}
            />
          )}/>
          <Route path="/new-dish" element={<NewDish/>}/>
          <Route path="/edit-dish/:id" element={<EditDish/>}/>

          <Route path="/checkout" element={(
            <Checkout cartDishes={cartDishes}/>
          )}>
            <Route path="continue" element={(
              <CustomerForm cartDishes={cartDishes}/>
            )}/>
          </Route>
          <Route path="*" element={(
            <h1>Not found!</h1>
          )}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
