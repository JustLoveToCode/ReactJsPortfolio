import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { GithubContext } from '../context/context';


// Create the Search Functionality:
const Search = () => {
  // Using the useState Method:
  const [user, setUser] = React.useState('');
  // useContext to extract that requests from context.js:
  const {requests, error, searchGithubUser, isLoading} = React.useContext(GithubContext);
  // Creating the handleSubmit Function:
  const handleSubmit=(e)=>{
  // Using the e.preventDefault():
    e.preventDefault();
// If user exist when you do handleSubmit Function:
    if(user){
      searchGithubUser(user);
// Setting it back to Empty String ' ' Here:
      setUser('')
    }
    
      
  }

  return(
  <section className="section">
    <Wrapper className="section-center">
      {/* If error.show is true, show the ErrorWrapper */}
      {error.show && <ErrorWrapper>
      {/* Display the error.msg */}
        <p>{error.msg}</p>
        </ErrorWrapper>}
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <MdSearch/>
          <input type="text" placeholder="Enter Github User Here"
          // The value of {user} here is Controlled by the setUser Method:
          // Using the onChange Method: e.target.value Here
          // This is what the User will be typing in:
          value={user} onChange={(e)=>setUser(e.target.value)}/>
          {/* Using the && And Operator Here: */}
          {/* requests is extracted from the React.useContext(GithubContext) */}
          {/* If requests>0 and isLoading is false, the button will then be shown */}
          {requests>0 && !isLoading && (<button type="submit">Search Here</button>)}
        </div>
      </form>
      {/* Getting the requests using {requests} Here */}
      <h3>Requests: {requests}/60</h3>
    </Wrapper>
  </section>
  )
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
