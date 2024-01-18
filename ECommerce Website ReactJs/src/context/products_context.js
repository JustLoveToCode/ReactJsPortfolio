import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
// This will get you 2 Different Endpoints for the product URL:
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

// This is the Initial State of the product:
const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {}
}
// Using the useContext Hook Here:
const ProductsContext = React.createContext()


// Using the ProductsProvider Function here:
export const ProductsProvider = ({ children }) => {
  // Setting the useReducer Hook Here:
  const [state, dispatch] = useReducer(reducer, initialState)
  //openSidebar function will have SIDEBAR_OPEN as the type:
  // This will invoke the action.type === SIDEBAR_OPEN
  const openSidebar = ()=>{
    dispatch({type:SIDEBAR_OPEN})
  }
  //closeSidebar function will have SIDEBAR_CLOSE as the type:
  //This will invoke the action.type === SIDEBAR_CLOSE
  const closeSidebar =()=>{
    dispatch({type:SIDEBAR_CLOSE})
  }
// This is the data that is coming from the Axios Library
// and await axios.get(url) will get you the url Here:
// This will invoke the action.type === GET_PRODUCT_BEGIN
// This is the fetchProducts Function:
  const fetchProducts = async(url)=>{
    dispatch({type: GET_PRODUCTS_BEGIN})
    try{
      // Using the axios to get the url:
      const response = await axios.get(url)
      // products being the Empty Array will get the response.data
      // in the form of the object [{}, {}, {}, {}]:
      const products = response.data
      // This will dispatch the action.type === GET_PRODUCT_SUCCESS:
      dispatch({type:GET_PRODUCTS_SUCCESS, payload:products})
    }
    catch(error){
      // This will dispatch the action.type === GET_PRODUCT_ERROR:
      dispatch({type:GET_PRODUCTS_ERROR})
    }
   
  }

// Using the useEffect Hook
// Empty Dependency [] will mean that the
// Function will run Once, fetchProducts(url) will
// only be Called Once:
  useEffect(()=>{
  fetchProducts(url)
  }, [])

  // Creating the fetchSingleProduct Function:
  const fetchSingleProduct = async(url)=>{
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN});
    try{
      const response = await axios.get(url);
      const singleProduct = response.data
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct})
    }
    catch(error){
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})

    }
  }


  return (
// ProductsProvider Component is the Context Provider
// That wrap the children with the ProductsContext.Provider:
// The value prop of the provider is the object that include the current
// state and the openSidebar and closeSidebar Functions
// This make these Values Available to Any Component that consume
// these Context using the useContext Hook within the Subtree
    <ProductsContext.Provider value={{...state, openSidebar, closeSidebar, fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}

// Need to Use:
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
