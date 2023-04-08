import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Searched from './Searched'

const Search = () => {
    const [input, setInput] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.preventDefault()
        setSearchInput(input)
        console.log(searchInput)
        setInput('')
        navigate('/')
    }

    return ( 
        <div className="search">
            <form className='search-form'>
                <input 
                type='text'
                placeholder='Search recipes...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{  float: 'left'}}
                />
                <button type='submit' onClick={handleChange} style={{  float: 'left'}}>
                    <span className="material-symbols-outlined">Search</span>
                </button>
            </form>

            <Searched searchInput={searchInput} />
        </div>
     )
}

export default Search