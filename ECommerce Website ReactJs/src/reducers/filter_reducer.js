import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  // This is the action.type === LOAD_PRODUCTS:
  if(action.type === LOAD_PRODUCTS){
  // Using the map Method to get the price:
  let maxPrice = action.payload.map((p)=>p.price)
  // console.log(maxPrice)
  // Using the max to get the Max Price:
  maxPrice = Math.max(...maxPrice)
  
    // If we ever need to go back to the default
    // we will just use the all_products:
    // all_products will Stay the Same Throughout:
    return {...state, all_products:[...action.payload],
    filtered_products:[...action.payload],
    filters:{...state.filters, max_price:maxPrice, price:maxPrice}
    }
  }
  // This is the action.type === SET_GRIDVIEW:
  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view:true}
  }
  // If the action.type === SET_LISTVIEW:
  if(action.type === SET_LISTVIEW){
    return {...state, grid_view:false}
  }
  // If the action.type === UPDATE_SORT:
  if(action.type === UPDATE_SORT){
    return {...state, sort:action.payload}
  }
  // If the action.type === SORT_PRODUCTS:
  if(action.type === SORT_PRODUCTS){
    const {sort, filtered_products} = state;
    let tempProducts = [...filtered_products];
  // Using the sort Method:
    if(sort === 'price-lowest'){
      tempProducts = tempProducts.sort((a,b)=>a.price-b.price)
    }
  // Using the sort Method:
    if(sort ==='price-highest'){
      tempProducts =tempProducts.sort((a,b)=>b.price-a.price)
    }
  // Using the sort Method:
    if(sort === 'name-a'){
      tempProducts = tempProducts.sort((a,b)=>{
        return a.name.localeCompare(b.name)
      })
    }
  // Using the sort Method:
    if(sort === 'name-z'){
      tempProducts = tempProducts.sort((a,b)=>{
        return b.name.localeCompare(a.name)
      })
    }
    return {...state, filtered_products:tempProducts}
  }
  // If the action.type === UPDATE_FILTERS:
  if(action.type === UPDATE_FILTERS){
    const {name, value} = action.payload
    return {...state, filters:{...state.filters, [name]:value}}

  }
  // If the action.type === FILTER_PRODUCTS:
  if(action.type ===FILTER_PRODUCTS){
    const {all_products} = state
    const {text, category, company, color, price, shipping} = state.filters
    
    let tempProducts = [...all_products]
    
    // If I do not type anything, this condition is not met
    // and hence it will be false:
    // Filtering the text:
    if(text){
    // Filtering the Product using the filter Method:
      tempProducts = tempProducts.filter((product)=>{
    // This is what you want to return here as the
    // return statement here:
        return (
          // Returning the product and convert it to the toLowerCase()
          // depending on the startsWith(text) Value Here:
          product.name.toLowerCase().startsWith(text)
        )
      })
    }
    // Category:
    // If the category is not equal to 'all':
    if(category !== 'all'){
      // Use the filter method to filter the product with the product.category
      // which is equal to the category that is coming in:
      tempProducts = tempProducts.filter(product=> product.category === category)

    }
    // Company Filters:
    // If the company is not equal to 'all':
    if (company !== 'all'){
      tempProducts = tempProducts.filter(product=>product.company === company)
    }

    // Colors Filter:
    if (color !== 'all'){
      tempProducts = tempProducts.filter((product, index)=>{
        // Using the find method on the Array of the colors
        return product.colors.find((c)=> c=== color)

      })
    }

    // Price Filter:
    tempProducts = tempProducts.filter((product)=>product.price <= price)


    // Shipping Filter:
    // If the shipping is true:
    if (shipping){
      tempProducts = tempProducts.filter((product)=>product.shipping === true)
    }



    // This will be returned
    return {...state, filtered_products:tempProducts}
  }

  if(action.type === CLEAR_FILTERS){
    return{
      ...state,
      filters:{
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price:state.filters.max_price,
        shipping: false,
      }, 
  }
}

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
