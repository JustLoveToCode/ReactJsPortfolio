import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  // Get the id only from the useParams using Object Destructuring
  // <Route path="/products/:id" component={ProductDetail}/>
  // /products/123, useParams Hook will provide object with {id:123}
  // Destructuring Assignment {id} = useParams() will extract the id value:
  const {id} = useParams();
  const navigate = useNavigate();
  // This is accessing the ...state and the fetchSingleProduct properties Here:
  const {single_product_loading:loading, single_product_error:error, 
  single_product:product, fetchSingleProduct} = useProductsContext();

  useEffect(()=>{
  fetchSingleProduct(`${url}${id}`)
  // eslint-disable-next-line
  }, [id])

  useEffect(()=>{
    if(error){
      setTimeout(()=>{
    // Programmatically Navigate to the HomePage after 5 seconds:
      navigate('/')
      }, 5000)
    }
    // eslint-disable-next-line
  }, [error])

  if(loading){
    return <Loading/>
  }
  if(error){
    return <Error/>
  }
// Using the Object Destructuring to extract all the properties:
  const {name, price, description, stock, stars, reviews, id:sku, company,
  images} = product
  return (
  <Wrapper>
    <PageHero title={name} product/>
    <div className="section section-center page">
      <Link to="/products"className="btn">
        Back to Products
      </Link>
      <div className="product-center">
{/* images is the Array of 5 Different items passed down*/}
        <ProductImages images={images}/>
        <section className="content">
          <h2>{name}</h2>

          <Stars stars={stars} reviews={reviews}/>
          <h5 className="price">{formatPrice(price)}</h5>
          <p className="desc">{description}</p>
          <p className="info">
            <span>Available:</span> 
            {stock> 0 ? 'It is In Stock': "It is Out of Stock"}
          </p>
          <p className="info">
            <span>SKU:</span>
            {sku}
          </p>
          <p className="info">
            <span>Brand: </span>
            {company}
          </p>
          <hr/>
          {stock>0 &&<AddToCart product={product}/>}

        </section>
      </div>
    </div>
  </Wrapper> 
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
