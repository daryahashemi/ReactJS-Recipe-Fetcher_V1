import { useContext } from 'react'
import { DataContext } from '../context/DataContex'
import { Link } from 'react-router-dom'
import { searchActiveShoppings } from './Searched'
import { searchActiveLikes } from './Searched'

const URL_L = 'http://localhost:8000/likes'
const URL_S = 'http://localhost:8000/shoppinglist'

const HeaderContent = () => {
    const { searched,
            likedRecipes, setLikedRecipes,
            shoppingListitems, setShoppingListitems,
            setActiveLikes,
            setActiveShoppings } = useContext(DataContext)

    const headersDataFetch = async () => {      
        try {
            const response1 = await fetch(URL_L)
            const json1 = await response1.json()  
        
            if(response1.ok) {
            setLikedRecipes(json1)
            }
        
            const response2 = await fetch(URL_S)
            const json2 = await response2.json()  
            if(response2.ok) {
            setShoppingListitems(json2)
            return 
            }
        
        } catch(err) {
            if(err.message === 'Failed to fetch') {
            throw new Error('There was a problem loading data from the database.');
            }
            throw new Error('There was a problem loading data from the database.');
        }          
    }

    const handleDeleteLike  = async (e, index, id) => {
        e.preventDefault()
        try {
            const response = await fetch(`${URL_L}/${id}` , { method: 'DELETE' })
            const json = await response.json()  
            if(response.ok) {
                const newlikedRecipes = likedRecipes.filter(key => key !== likedRecipes[index])
                setLikedRecipes(newlikedRecipes)
                searchActiveLikes(searched, setActiveLikes)
                return console.log('Like successfully deleted')
            }
        } catch(e) {
        throw new Error('There was a problem deleting the like.');
        }
    }  

    const handleDeleteShopping  = async (e, index, id) => {
        e.preventDefault()
        try {
            const response = await fetch(`${URL_S}/${id}` , { method: 'DELETE' })
            const json = await response.json()  
            if(response.ok) {
                const newshoppingListitems = shoppingListitems.filter(key => key !== shoppingListitems[index])
                setShoppingListitems(newshoppingListitems)
                searchActiveShoppings(searched, setActiveShoppings)
                return console.log('Shopping item successfully deleted')
            }
        } catch(e) {
        throw new Error('There was a problem deleting the shopping item.');
        }
    }  

    return ( 
        <div className="header-content">
            <h1>Recipe & Order</h1>
            <div className="header-items">                

                <div className="dropdown" >
                    <span className="dropbtn" onMouseOver={headersDataFetch}>
                        <span className="material-symbols-outlined activelike">Favorite</span>
                    </span>
                    <div className="dropdown-content" style={{border: '3px solid var(--secondary)'}}>
                        {likedRecipes && likedRecipes.map((item, index) => (
                        <div className='dropdown-items' key={index}>
                            <Link to={`/recipe/${item.id}`}>
                                <img src={item.image}/>
                                <span>{item.title}</span>
                            </Link>
                            <span 
                            className="material-symbols-outlined deleteheader"
                            onClick={(e) => handleDeleteLike(e, index, item.id)}
                            >Delete</span>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="dropdown" >
                    <span className="dropbtn" onMouseOver={headersDataFetch}>
                        <span className="material-symbols-outlined activeshopping">Shopping_cart</span>
                    </span>
                    <div className="dropdown-content"  style={{border: '3px solid var(--primary)'}}>
                        {shoppingListitems && shoppingListitems.map((item, index) => (
                        <div className='dropdown-items' key={index}>
                            <Link to={`/recipe/${item.id}`}>
                                <img src={item.image}/>
                                <span>{item.title}</span>
                            </Link>
                            <span 
                            className="material-symbols-outlined deleteheader"
                            onClick={(e) => handleDeleteShopping(e, index, item.id)}
                            >Delete</span>
                        </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div> 
    )
}
 
export default HeaderContent