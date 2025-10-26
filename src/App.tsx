import React, {  useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search/Search'
import axios from 'axios'
import { MovieTile, type IMovieData } from './components/MovieTile/MovieTile'

function App(): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState('')
  const [popularMovies, setPopulsarMovies] = useState<IMovieData[] | undefined>(undefined)
const [isLoading, setIsLoading] = useState(true)
  
  const params = { api_key: import.meta.env.VITE_TBMD_API_KEY }
  const headers = {'Authorization': `Bearer ${import.meta.env.VITE_TMMD_READ_ACCESS_TOKEN}`}
  
  const axiosGet = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}discover/movie?sort_by=popularity.desc`, { params: params, headers: headers })
      setPopulsarMovies(response.data.results)
      console.log(response.data)
    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching movies. Try again later")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    axiosGet()
  },[])

  const [searchTerm, setSearchTerm] = useState("")
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-moviles'>
          <h2>All Movies</h2>
          {isLoading ? <p>Is Loading</p> : popularMovies?.map((item: IMovieData) => {
            return <MovieTile title={item.title} description={item.description} poster={item.poster} vote={item.vote} />
          })}
          {errorMessage && <p className='text-red-500'>
            {errorMessage}
          </p>}
        </section>
      </div>
    </main>
  )
}

export default App
