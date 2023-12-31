import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

// This is getting the url Here:
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

// This is using the createContext Hook:
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');

  const [cocktails, setCocktails] = useState([]);

  // Only if Something actually Changes about this Function:
  // Only if the Search Term Changes, then create it from the Scratch:
  const fetchDrinks = useCallback(async()=>{
    setLoading(true)
    try{
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      // Object Destructuring to get the drinks Properties:
      const {drinks} = data;
      if(drinks){
        const newCocktails = drinks.map((drink)=>{
          // Using the Method of the Object Destructuring to get the Properties:
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = drink;
          // Using the Name Alias Method to give it a Simpler Name:
          return{id:idDrink, name:strDrink, image:strDrinkThumb, info:strAlcoholic,
          glass:strGlass}
        })
        setCocktails(newCocktails)
       
      }
      else {
        setCocktails([])
      }
      // Regardless of whether there is drinks or no drink
      // Set the Loading to be equal to false:
      setLoading(false)
      
     

    }
    catch(error){
      console.log(error)
      setLoading(false)

    }
  }
  ,[searchTerm])

// Using the useEffect Hook:
  useEffect(()=>{
    fetchDrinks()
  },[searchTerm, fetchDrinks])
  return <AppContext.Provider value={{
    // cocktails, setSearchTerm and loading is Accessible
    // throughout our Component:
    loading, cocktails, setSearchTerm
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
