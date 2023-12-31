import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  // Extracting the id using the useParams() Methods:
  const {id} = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(()=>{
    setLoading(true)
    async function getCocktail(){
      try{
          const response = await fetch(`${url}${id}`);
          const data = await response.json();
          if(data.drinks){
            // Using the Name Alias and the Object Destructuring:
              const {strDrink:name, strDrinkThumb:image, strAlcoholic:info,
              strCategory:category, strGlass:glass,strInstructions:instructions,
            strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5} = data.drinks[0]
          // Organizing the different ingredients into 1 Single Variable called ingredients Variable:
          const ingredients = [
            strIngredient1,strIngredient2, strIngredient3, strIngredient4, strIngredient5
          ]
          // ReOrganizing the Data and making it into 1 single newCocktail:
          const newCocktail = {
            name, image, info, category,glass,instructions,ingredients
          }
          setCocktail(newCocktail)
        }

          else{
              setCocktail(null)
             
          }
          setLoading(false)
  
      }
      catch(error){
        console.log(error);
        setLoading(false)

      }
    }
    getCocktail()
  },[id])
  if(loading){
    return <Loading/>
  }
  if(!cocktail){
    return <h2 className="section-title">No Cocktails to Display</h2>
  }
  const {name,image,category, info, glass, instructions, ingredients} = cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">Back to Home</Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image}alt={name}/>
        <div className="drink-info">
          <p>
            <span className="drink-data">Name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Instruction:</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>
            {/* ingredients is an Array */}
            {ingredients.map((item,index)=>{
              return(
              item? <span key={index}>{item}</span>: null
              )
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
