import React, {  useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search/Search'
import axios from 'axios'
import { MovieTile } from './components/MovieTile/MovieTile'
import type { TMOvieResponse } from './types/tbmdTypes'
import { Spinner } from "flowbite-react";

function App(): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState('')
  const [popularMovies, setPopulsarMovies] = useState<TMOvieResponse[] | undefined>(undefined)
const [isLoading, setIsLoading] = useState(false)
  
  const params = { api_key: import.meta.env.VITE_TBMD_API_KEY }
  const headers = {'Authorization': `Bearer ${import.meta.env.VITE_TMMD_READ_ACCESS_TOKEN}`}
  
  const axiosGet = async () => {
    setIsLoading(true)
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
          <h2 className='mt-[20px]'>All Movies</h2>
          {isLoading ? <Spinner /> : errorMessage ? <p className='text-red-500'>
            {errorMessage}
          </p> : (
              <ul>
                {popularMovies?.map((item: TMOvieResponse) => (
                  <MovieTile key={item.id} title={item.title} description={item.description} poster={item.poster_path} vote={item.vote_average} />
                ))}
                </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
