import { createContext, useState } from 'react'

export const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {
  const [searched, setSearched] = useState([])
  const [likedRecipes, setLikedRecipes] = useState([])
  const [shoppingListitems, setShoppingListitems] = useState([])

  const [changeInHeader, setchangeInHeader] = useState(0)

  const [activeLikes, setActiveLikes] = useState(Array(changeInHeader).fill(''))
  const [activeShoppings, setActiveShoppings] = useState(Array(changeInHeader).fill(''))

  return (
    <DataContext.Provider value={{ 
        searched, setSearched,
        likedRecipes, setLikedRecipes,
        shoppingListitems, setShoppingListitems,
        changeInHeader, setchangeInHeader,
        activeLikes, setActiveLikes,
        activeShoppings, setActiveShoppings
      }}>
      { children }
    </DataContext.Provider>
  )
}

