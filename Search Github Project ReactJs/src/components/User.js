import React from 'react';
import styled from 'styled-components';
// This is Not Exported Globally:
import Card from './Card';
// This is Not Exported Globally:
import Followers from './Followers';
const User = () => {
  return(
  <section className="section">
    <Wrapper className="section-center">
      <Card></Card>
      <Followers></Followers>
      
    </Wrapper>
  </section>
  )
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User;
