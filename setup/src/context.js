import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'});
  }

  const removeItem = (id) => {
    dispatch({type: 'REMOVE_ITEM', payload: id});
  }

  const increase = (amount) => {
    console.log(amount)
    dispatch({type: 'INCREASE', payload: amount});
  }

  const decrease = (amount) => {
    dispatch({type: 'DECREASE', payload: amount});
  }

  const fetchData = async () => {
    dispatch({type: "LOADING"})
    const response = await fetch(url, { 
      header: {
        'Access-Control-Allow-Origin': 'http://localhost:3001/'
      }
    });

    const data = await response.json();

    console.log(data);
    dispatch({type: "DISPLAY", payload: data})
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    dispatch({type: "GET_TOTAL"});
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
