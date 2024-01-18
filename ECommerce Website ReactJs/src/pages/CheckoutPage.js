import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// Additional import
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'


const CheckoutPage  = () => {
  const {cart} = useCartContext()
  return(
   <main>
    <PageHero title="checkout"/>
    <Wrapper className='page'>
      {/* Using the Optional Ternary Operator */}
      {cart.length<1?<div className="empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn">
          Fill It Here
        </Link>
      </div>:<StripeCheckout/>}
    </Wrapper>
   </main>

  )
}
const Wrapper = styled.div`
display:flex;
align-items:center;
justify-content:center;
.empty{
  text-align:center;
}`

export default CheckoutPage
