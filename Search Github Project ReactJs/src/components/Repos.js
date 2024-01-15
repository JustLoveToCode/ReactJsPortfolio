import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const {repos} = React.useContext(GithubContext)
  // Using the reduce method for the Iteration and the Total Items:
  // returning the total and the item here:
  // item here is the Iteration:
  // Initialize as the Empty Object {}:
  const languages = repos.reduce((total, item)=>{
  // Getting the language properties from all the Other Properties
  // in the item Variable Using the Object Destructuring:

    const {language, stargazers_count} = item
    // If the language Variable is null, return the total here:
    if(!language) return total;
  
    // If the total[language] do not exist:
    // This is creating the key and the value here:
    // If the language do not exist, set it equal to key = 1 here:
    if(!total[language]){
    // Creating the First Instance as the Object:
      total[language] = {label:language, value:1, stars: stargazers_count};
    }
    // If the language already exist:
    // Add 1 to the value, Keep Track of the Count:
    else{
      // Keeping the Original Object and Overriding it with new value for the Value:
      total[language] = {...total[language], value:total[language].value + 1,
      // Getting the stars for each iteration and adding it to the Count which is stargazers_count:
      stars:total[language].stars + stargazers_count};
    }
    return total;
// This is the Empty Object: {}: Which is the Inital Value for
// the Accumulator: Accumulator, which start as the Empty Object {}
  }, {})
 
  // Converting it from the Object to the Array:
  // sort Method will Iterate through the Array:
  // value is the Integer Property:
  //[{value}, {value}, {value}]--b.value and a.value:
 const mostUsed = Object.values(languages).sort((a,b)=>{
    return b.value - a.value
  // Using the slice method to slice the first 
  // 5 data from Index 0 to 4:
  }).slice(0,5);
// Most stars Per Language:
const mostPopular = Object.values(languages).sort((a,b)=>{
return b.stars - a.stars;
}).map((item)=>{
// Reassignment of the stars in item.stars to the value property:
// For each Iteration, return the item and the value with the item.stars property:
return {...item, value:item.stars}
// Using the slice method here:
}).slice(0,5);

//stars, forks:
let {stars, forks} = repos.reduce((total, item)=>{
  const {stargazers_count, name,forks} = item;
  total.stars[stargazers_count] = {label:name, value:stargazers_count}
  total.forks[forks] = {label:name, value:forks}
  return total
},{
  stars:{},forks:{}
});

//Taking the Last 5 Data and Showing the Biggest Data First:
stars = Object.values(stars).slice(-5).reverse();
forks = Object.values(forks).slice(-5).reverse();

// Dummy Data
  const chartData = [
    {
      label: "HTML",
      value: "13"
    },
    {
      label: "CSS",
      value: "160"
    },
    {
      label: "JavaScript",
      value: "80"
    }
  ];

  return (
  <section className="section">
    <Wrapper className="section-center">
        <Pie3D data={mostUsed}/>
        <Column3D data={stars}/>
        {/* <ExampleChart data={chartData}/> */}
        <Doughnut2D data={mostPopular}/>
        <Bar3D data={forks}/>
    </Wrapper>
  </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
