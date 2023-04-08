import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const API_KEY_C = import.meta.env.VITE_API_KEY
const Recipe = () => {
    const [recipe, setRecipe] = useState([])
    let params = useParams()

    console.log(params.id)

    const getRecipe = async () => {
            const response = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY_C}`)
            
            const data = await response.json()
            console.log(data, 'hhhh')
            setRecipe(data)
    }

    useEffect(() => {
        getRecipe()
    }, [params.id])

    return ( 
        <div>
            <div className="header-content-recipe">
                <h1>Recipe & Order</h1>
            </div>
            <div className='back-to-home'>
                <strong>Back to the homepage: <Link to='/'>Recipe & Order</Link></strong>
            </div>  

            <div className='recipe'>     
                <div className='recipe-top'>
                    <h3>{recipe.title}</h3>
                    <img src={recipe.image} alt={recipe.title} />
                </div>
                <div className='info'>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe?.extendedIngredients?.map((ingred) => (
                            <li key={ingred.id}>{ingred.original}</li>
                        ))}
                    </ul>

                    <div>
                    <h3>Instructions</h3>
                        <div className='instructions' dangerouslySetInnerHTML={{__html: recipe.instructions}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe