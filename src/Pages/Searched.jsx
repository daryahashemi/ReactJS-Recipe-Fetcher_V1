import { Link } from 'react-router-dom'
import { useState, useEffect, useContext, useCallback, useReducer } from 'react'
import { useQuery } from 'react-query'
import { DataContext } from '../context/DataContex'
import Search from './Search'

const API_KEY_C = import.meta.env.VITE_API_KEY
const URL_L = 'http://localhost:8000/likes'
const URL_S = 'http://localhost:8000/shoppinglist'

export const searchActiveShoppings = async (json1, setActiveShoppings) => {
    const response3 = await fetch(URL_S)
    const json3 = await response3.json()

    const newShoppingList = Array(json1).fill('')
    let ii , jj;        
    for(ii = 0; ii < json3.length; ii++) {
        for(jj = 0; jj < json1.length; jj++) {
            if (json3[ii].id === json1[jj].id) {
                newShoppingList[jj] = 'activeshopping'
            }    
        }
    }
    setActiveShoppings(newShoppingList)
    return json3
}

export const searchActiveLikes = async (json1, setActiveLikes) => {
    const response2 = await fetch(URL_L)
    const json2 = await response2.json()

    const newLikeList = Array(json1).fill('')
    let i , j;        
    for(i = 0; i < json2.length; i++) {
        for(j = 0; j < json1.length; j++) {
            if (json2[i].id === json1[j].id) {
                newLikeList[j] = 'activelike'
            }    
        }
    }
    setActiveLikes(newLikeList)
    return json2
}

const Searched = ({ searchInput }) => {

    const { searched, setSearched,
            likedRecipes, setLikedRecipes,
            shoppingListitems, setShoppingListitems,
            changeInHeader, setchangeInHeader,
            activeLikes, setActiveLikes,
            activeShoppings, setActiveShoppings } = useContext(DataContext)

    const [ page, setPage ] = useState(1)
    const totalPagesNumber = 3
    const defaultInput = 'Pizza' 
    // const [activeLikes, setActiveLikes] = useState(Array(searched.length).fill(''))
    // const [activeShoppings, setActiveShoppings] = useState(Array(searched.length).fill(''))

    const getSearched = async (typename, pagenumber) => {

        // const response1 = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_C}&offset=${pagenumber}&number=4&query=${typename}`)
        const json1 = await response1.json()
    
        setSearched(json1.results)
        console.log(json1.results, 'kkkkkk')
        setchangeInHeader(searched.length)
        searchActiveShoppings(json1.results, setActiveShoppings)
        searchActiveLikes(json1.results, setActiveLikes)
        return json1
    }



    useEffect(() => {
        if(!searchInput) {
            getSearched(defaultInput, page) 
        } else {
            getSearched(searchInput, page) 
        }
    }, [searchInput, page])

    // const { 
    //   resolvedData, 
    //   latestData, 
    //   status 
    // } = usePaginatedQuery(['recipes',searchInput, page], getSearched);

    // const {
    //     isLoading,
    //     isError,
    //     error,
    //     data,
    //     isFetching,
    //     isPreviousData
    //   } = useQuery(['recipes',searchInput, page], 
    //   () => { countRef.current += 1
    //           return getSearched(searchInput, page) }, 
    //   { keepPreviousData: true, staleTime: 100000000});


    const handleAddLike  = async (e, index, id, title, image) => {
        e.preventDefault()
        const doc = {id: id, title: title, image: image}
        try {
            const response = await fetch(URL_L, {
                        method: 'POST',
                        body: JSON.stringify(doc),
                        headers: { 'Content-Type': 'application/json' }
                        })
            const json = await response.json()  
            if(response.ok) {
                const newlikedRecipes = likedRecipes.filter(key => key !== likedRecipes[index])
                setLikedRecipes(newlikedRecipes)
                searchActiveLikes(searched, setActiveLikes)
                return console.log('Recipe successfully liked.')
            }
        } catch(e) {
        throw new Error('There was a problem liking the recipe.');
        }
    }

    const handleAddShopping  = async (e, index, id, title, image) => {
        e.preventDefault()
        const doc = {id: id, title: title, image: image}
        try {
            const response = await fetch(URL_S, {
                        method: 'POST',
                        body: JSON.stringify(doc),
                        headers: { 'Content-Type': 'application/json' }
                        })
            const json = await response.json()  
            if(response.ok) {
                const newshoppingListitems = shoppingListitems.filter(key => key !== shoppingListitems[index])
                setShoppingListitems(newshoppingListitems)
                searchActiveShoppings(searched, setActiveShoppings)
                return console.log('Shopping item successfully added to cart.')
            }
        } catch(e) {
        throw new Error('There was a problem adding the shopping item.');
        }
    }
   
    return ( 
        <div className="searched">
        {!searchInput && 
        <div>
            <h3>Pizza Recipe</h3>
            <div className='searched-recipes'>
            {searched && searched?.map((item, index) => (
                <div className='searched-item' key={item.id}>
                    <Link to={`/recipe/${item.id}`}>
                        <div className='photo'>
                            <img 
                            className="trashcan" 
                            src={`${item.image}`} 
                            alt={item.title}
                            /> 
                            <div className="text-photo" >
                                <h4>{item.title} </h4>
                            </div>
                        </div>
                    </Link>
                    <div className='icons-photo'>
                        <span 
                        className={`material-symbols-outlined heart ${activeLikes[index]}`}
                        onClick={(e) => handleAddLike(e, index, item.id, item.title, item.image)}
                        >Favorite</span>
                        <span 
                        className={`material-symbols-outlined shopping ${activeShoppings[index]}`}
                        onClick={(e) => handleAddShopping(e, index, item.id, item.title, item.image)}
                        >Shopping_cart</span>
                    </div>
                </div> 
            ))}
            </div>
            <div className="pagination">
                {/* <button>
                Previous Page
                </button>
                <span> {page}</span>
                <span> of {totalPagesNumber} </span>
                <button>
                Next page
                </button>  */}
                <button 
                onClick={() => setPage(old => Math.max(old - 1, 1))} 
                disabled={page === 1}>
                Previous Page
                </button>
                <span> {page}</span>
                <span> of {totalPagesNumber} </span>
                <button 
                onClick={() => setPage(old => (page === totalPagesNumber ? old : old + 1))} 
                disabled={page === totalPagesNumber}>
                Next page
                </button> 
            </div>
        </div>
        }
        {searchInput && 
        <div>
            <h3>"{searchInput}" is searched: </h3>
            <div className='searched-recipes'>
            {searched && searched?.map((item, index) => (
                <div className='searched-item' key={item.id}>
                    <Link to={`/recipe/${item.id}`}>
                        <div className='photo'>
                            <img 
                            className="trashcan" 
                            src={`${item.image}`} 
                            alt={item.title}
                            /> 
                            <div className="text-photo" >
                                <h4>{item.title}</h4>
                            </div>
                        </div>
                    </Link>
                    <div className='icons-photo'>
                        <span 
                        className={`material-symbols-outlined heart ${activeLikes[index]}`}
                        onClick={(e) => handleAddLike(e, index, item.id, item.title, item.image)}
                        >Favorite</span>
                        <span 
                        className={`material-symbols-outlined shopping ${activeShoppings[index]}`}
                        onClick={(e) => handleAddShopping(e, index, item.id, item.title, item.image)}
                        >Shopping_cart</span>
                    </div>
                </div> 
            ))}
            </div>

            <div className="pagination">
                <button 
                onClick={() => setPage(old => Math.max(old - 1, 1))} 
                disabled={page === 1}>
                Previous Page
                </button>
                <span> {page}</span>
                <span> of {totalPagesNumber} </span>
                <button 
                onClick={() => setPage(old => (page === totalPagesNumber ? old : old + 1))} 
                disabled={page === totalPagesNumber}>
                Next page
                </button> 
            </div>
        </div>
        } 
    </div>
    )
}

export default Searched