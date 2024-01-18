import React, { useState } from 'react'
import styled from 'styled-components'

// The Arrays of the images is passed here:
// images will just be an Empty Array with the url as the empty string ' '
// This will prevent any form of error that will occur:
const ProductImages = ({images=[{url:''}]}) => {
// The Main Images at the start is the Default Start Image:
  const [main, setMain] = useState(images[0])
  return (
    <Wrapper>

{/* This main.url is the Main Image: */}
        <img src={main.url} alt="main" className="main"/>
        <div className="gallery"> 
{/* Using the map method to map the 5 Remaining Small Images: for the images[index] */}
          {images.map((image, index)=>{
            return(
              <img src={image.url} alt={image.filename} key={index}
              // The onClick is on the Image that will trigger
              // the useState Hook to change the Main Image
              onClick={()=>setMain(images[index])}
              // Conditionally Rendering using Ternary Operator:
              className={`${image.url === main.url? 'active': null}`}
              />
            )
          })}
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
