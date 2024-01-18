import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  /* Using the Double Ternary Operator for Checking the Number of Stars Review */
  /* Checking if my star is greater than 1 or 2 or 3 or 4 or 5 */
  
  // Create the Array with 5 Empty Length:
  const tempStars = Array.from({length:5}, (_,index)=>{
  // For every iteration, the index will Change:
  // For the first iteration, the index will be 0
  // and it will increased to 1 and 2...
    const number = index + 0.5
    return (
      <span key={index}>
      {/* Checking if the Condition below is True or False */}
      {/* Adding the +1 because value start from 1 to 5 */}
      {stars >=index+1?(<BsStarFill/>):stars>=number?(<BsStarHalf/>):(<BsStar/>)}
      </span>
    )
  });

  return(
  <Wrapper>
    <div className="stars">
    {/* star */}
    {tempStars}
    {/* end of star */}
    </div>
    <p className="reviews">({reviews} Customer Reviews)</p>
  </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
