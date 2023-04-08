import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_KEY_C = import.meta.env.VITE_API_KEY

const Veggie = () => {
    const [veggies, setVeggies] = useState([])
    const [ page, setPage ] = useState(1)

    const getVeggies = async ( pagenumber ) => {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY_C}&offset=${pagenumber}&number=9&tags=vegetarian`)
        const json = await response.json()
        setVeggies(json.recipes)
        console.log(json, 'voooo')
        return json 
    }

    useEffect(() => {
        getVeggies(page)
    }, [page])

    return ( 
        <div className='veggie-list'>
            <h3>Veggie Recipes</h3>
                {veggies?.map((recipe) => {
                    return (
                        <div className='veggie-item' key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title} />
                            <span></span> 
                            </Link>
                        </div>
                    )
                })}


            {/* <InfiniteScroll
                pageStart={0}
                loadMore={() => getVeggies()}
                hasMore={true || false}
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow={false}

            >
                {veggies?.map((recipe) => {
                return (
                        <div className='veggie-item' key={recipe.id}>
                            <Link to={`/recipe/${recipe.id}`}>
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title} />
                            <span></span> 
                            </Link>
                        </div>
                    )
                })}
            </InfiniteScroll> */}
        </div>
     )
}
 
export default Veggie