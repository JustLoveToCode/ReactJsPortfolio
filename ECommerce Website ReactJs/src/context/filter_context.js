import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters:{
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price:0,
    max_price:0,
    price:0,
    shipping: false
  }
}

// Creating the Context Here:
const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
// Getting the products from the function useProductsContext:
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
  // We will need to Load the Products First:
  dispatch({type:LOAD_PRODUCTS, payload:products})
  }, [products])

  useEffect(()=>{
  // First We Filter the Products, then
  // We will actually Sort the Products:
  dispatch({type:FILTER_PRODUCTS})
  dispatch({type:SORT_PRODUCTS})
  // This is the Dependency Array which is
  // products, state.sort and state.filters:
  }, [products, state.sort, state.filters])


  const setGridView=()=>{
    dispatch({type:SET_GRIDVIEW})
  }

  const setListView=()=>{
    dispatch({type:SET_LISTVIEW})
  }

  const updateSort=(e)=>{
    // const name = e.target.name
    // console.log(name)
    const value = e.target.value
    dispatch({type:UPDATE_SORT, payload:value})
  }
  // e is the click itself for the event:
  const updateFilters =(e)=>{
    // event.target is actually the element that is clicked:
    let name = e.target.name

    let value = e.target.value

    // If the name is equal to the 'category' Here:
    if(name === 'category'){
      value = e.target.textContent
    }
    // If the name is equal to 'color' here:
    if(name ==='color'){
      value = e.target.dataset.color
    }
    // This is the name which is equal to something
    // the condition will be satisfied:
    if (name === 'price'){
    // Converting the String Number into int Number:
      value = Number(value)
    }
    // This is the name which is equal to something
    // the condition is satisfied:
    if (name === 'shipping'){
      value = e.target.checked
    }

    dispatch({type:UPDATE_FILTERS, payload:{name, value}})

  }

  const clearFilters=()=>{
    dispatch({type:CLEAR_FILTERS})

  }

  return (
    <FilterContext.Provider value={{...state,setGridView,setListView, updateSort, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// Make Sure to Use:
export const useFilterContext = () => {
  return useContext(FilterContext)
}
