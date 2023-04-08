import { useEffect, useState } from 'react'
// import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
// carousel is a slideshow for cycling through a series of content

const API_KEY_C = import.meta.env.VITE_API_KEY

const Popular = () => {
    const [popular, setPopular] = useState([])
    const getPopularRecipes = async () => {
        // const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY_C}&number=15`)
        const json = await response.json()
        setPopular(json.recipes)
        console.log(json, 'poooooo')
        return json 
    }

    useEffect(() => {
        getPopularRecipes()
    }, [])

    // const { data, status } = useQuery('popularRecipes', getPopularRecipes)
    // console.log(data.recipes)

    return ( 
        <div>
            <div className='popular'>
                <h3><span>Popular Recipes</span> </h3>
                {/* {status === 'loading' && (
                    <div>Loading data</div>
                )}

                {status === 'error' && (
                    <div>Error fetching data</div>
                )} */}

                {/* {status === 'success' && ( */}
                {/* {( */}
                <Splide options={{
                    perPage: 8,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '10px',
                    autoWidth: true,
                    }}>
                    {popular?.map((recipe) => {
                        return (
                        <SplideSlide key={recipe.id}>
                            <div className='popular-item'>
                                <Link to={`/recipe/${recipe.id}`}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <span></span> 
                                </Link>
                            </div>
                        </SplideSlide>
                        )
                    })}
                </Splide>
                {/* )} */}
            </div>
        </div>
     )
}

export default Popular