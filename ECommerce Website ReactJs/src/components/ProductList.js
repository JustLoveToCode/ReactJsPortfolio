import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  // Getting the Values from the filtered_products: products Here
  // Which is from the filter_products properties which have the alias of products:
  // This will Invoke the export const useFilterContext = () =>{return useContext(FilterContext)}
  const {filtered_products: products, grid_view} = useFilterContext();

  if(products.length<1){
    return(
      <h5 style={{textTransform: 'none'}}>
        Sorry, there is No Products that Match your Search...
      </h5>
    )
  }

  if(grid_view === false){
    return (
    <ListView products={products}/>
    )
  }

  return (
  <GridView products={products}>
    Product List
  </GridView>
  )
}

export default ProductList
