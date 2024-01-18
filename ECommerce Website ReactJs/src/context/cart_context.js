import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage=()=>{
  // Using the localStorage to getItem here:
  let cart = localStorage.getItem('cart');
  // If cart actually exist:
  if(cart){
    return JSON.parse(localStorage.getItem('cart'))
  }
  else {
    return []
  }
}
// Creating the initialState Here:
const initialState = {
// state.cart: Accessing the Array:
  cart: getLocalStorage(),
  total_items:0,
  total_amount:0,
  shipping_fee:534

}
// This will create the New Context Object:
// This Context Object come with 2 Components:
// The Provider and the Consumer:
// Use the const CartContext = React.createContext()
const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  // Creating the reducer function here:
  const [state, dispatch] = useReducer(reducer, initialState)

  // Add to Cart:
  const addToCart = (id, color, amount, product) =>{
    dispatch({type:ADD_TO_CART, payload: {
      id, color, amount, product
    }}
    )
  }

  // Remove from Cart:
  const removeItem = (id)=>{
    dispatch({type:REMOVE_CART_ITEM, payload: id})
    
  }
  // Toggle Amount:
    const toggleAmount = (id,value)=>{
      dispatch({type:TOGGLE_CART_ITEM_AMOUNT, payload:{id,value}})

    
    }
  // Clear the Cart:
    const clearCart = ()=>{
    dispatch({type: CLEAR_CART})
    }
// useEffect that will be Invoked 
// that will dispatch the Method of type:COUNT_CART_TOTALS
    useEffect(()=>{
    dispatch({type:COUNT_CART_TOTALS})
    localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])
   
  



  return (
    // This is adding the value={{...state}} here and passing
    // it down to the children props:
    <CartContext.Provider value={{...state, addToCart, removeItem, toggleAmount, clearCart}}>{children}</CartContext.Provider>
  )
}
// Make sure to useCartContext()
export const useCartContext = () => {
// Using the Context using useContext(CartContext) Method here:
  return useContext(CartContext)
}
