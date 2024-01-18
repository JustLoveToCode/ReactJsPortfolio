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

const products_reducer = (state, action) => {
// Getting the Different action.type Here:
  if (action.type === SIDEBAR_OPEN){
    // Need the return statement:
    return {...state,isSidebarOpen:true}

  }
  if (action.type === SIDEBAR_CLOSE){
    // Need the return statement:
    return {...state, isSidebarOpen:false}
    
  }

  if (action.type === GET_PRODUCTS_BEGIN){
    // Need the return statement:
    return {...state, products_loading:true
    }
  }

  if (action.type === GET_PRODUCTS_SUCCESS){
    const featured_products = action.payload.filter((product)=>
    product.featured === true)
    // Need the return statement:
    return {...state, products_loading:false, products: action.payload,
    featured_products
  }
  }

  if(action.type === GET_PRODUCTS_ERROR){
    // Need the return statement:
    return {...state, product_loading:false, products_error: true
    }
  }
  if(action.type === GET_SINGLE_PRODUCT_BEGIN){
    // Need the return statement:
    return {...state,single_product_loading: true, single_product_error:false 
    }
  }

  if(action.type === GET_SINGLE_PRODUCT_SUCCESS){
    // Need the return statement:
    return {...state, single_product_loading: false, single_product: action.payload
    }
  }

if (action.type === GET_SINGLE_PRODUCT_ERROR){
  // Need the return statement:
  return {
    ...state,
    single_product_loading: false,
    single_product_error: true
  }

}
throw new Error(`No Matching "${action.type}" - action type`)
}



export default products_reducer
