import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type === ADD_TO_CART){
    // Getting the entire product object using the Object Destructuring:
    const {id, color, amount, product} = action.payload;
    

    // In the cart, id is actually id + color
    const tempItem = state.cart.find((i) => i.id === id + color)
    // If the cart item already exist:
    // It mean that the id: id + color has already existed:
    if (tempItem){
      const tempCart = state.cart.map((cartItem)=>{
      // If the cartItem.id === id+ color, it mean it is Searching
      // for the cartItem.id that matched the id + color:
      // If the cartItem already exist, it mean that that only
      // the amount will increased here:
          if(cartItem.id === id + color){
            let newAmount = cartItem.amount + amount;
            if(newAmount > cartItem.max){
              newAmount = cartItem.max
            }
            return {...cartItem, amount: newAmount}

          }
          else{
          // If the cartItem does not exist at all:
            return cartItem
          }
      })

      return {...state, cart: tempCart}

    }
    // If the item is not in the cart
    // We will create the new one with the id: id + color:
    else{
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image:product.images[0].url,
        price:product.price,
        max:product.stock,

      }
      return {...state, cart:[...state.cart, newItem]}

    }

  }
  if(action.type === REMOVE_CART_ITEM){
    // Using the filter Method to filter out the item.id that is not equal to action.payload:
    const tempCart = state.cart.filter((item)=> item.id!==action.payload)
    return {...state, cart:tempCart}
  }
  // For this, the cart will become the Empty Array: []
  if(action.type === CLEAR_CART){
    return {...state, cart:[]}
  }
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    // Object Destructuring to get the id and value from
    // the action.payload Here:
    const {id, value} = action.payload
    const tempCart = state.cart.map((item)=>{
      if(item.id === id){
        if(value === 'inc'){
          // Using the let keyword because it is changing:
          let newAmount = item.amount + 1
          // We need to see if the newAmount is greater than item.max Here:
          // which is the Maximum Quantities in Stock:
          if(newAmount > item.max){
          // We will need to set newAmount to item.max Here:
            newAmount = item.max
          }
          return {...item, amount: newAmount}
        }
        if(value === 'dec'){
            if(item.id === id){
              let newAmount = item.amount -1
              // If we decrease the amount below 1,
              // we will need to change the newAmount to only 1:
              if(newAmount <1){
              // Set the newAmount to be equal to 1:
                newAmount = 1
              }
            return {...item, amount:newAmount}
            }     
        }
      } 
      return item
    })
    return {...state, cart:tempCart}
  }
  if(action.type === COUNT_CART_TOTALS){
    // total represent what we are returning:
    const {total_items, total_amount} = state.cart.reduce((total,cartItem)=>{
      // Extracting the amount and price properties from the cartItem:
      const {amount, price} = cartItem
      total.total_items += amount;
      total.total_amount +=price*amount
      return total
    }, {
      total_items:0, total_amount:0
    })
    return {...state,total_items,total_amount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
