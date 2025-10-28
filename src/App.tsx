import React, { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search/Search'
import axios from 'axios'
import { MovieTile } from './components/MovieTile/MovieTile'
import type { TMovieResponse } from './types/tbmdTypes'
import { Spinner } from "flowbite-react";
import { useDebounce } from 'react-use'
import { updateSearchCount } from './utils/appwrite'

function App(): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState('')
  const [popularMovies, setPopularMovies] = useState<TMovieResponse[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useDebounce(() => setDebouncedSearch(searchTerm), 500, [searchTerm])

  const params = { api_key: import.meta.env.VITE_TBMD_API_KEY }
  const headers = { 'Authorization': `Bearer ${import.meta.env.VITE_TMMD_READ_ACCESS_TOKEN}` }

  const fetchMovies = async (query: string = '') => {
    setIsLoading(true)
    try {
      const response = query ? await axios.get(`${import.meta.env.VITE_BASE_URL}search/movie?query=${encodeURIComponent(query)}`, { params: params, headers: headers }) :  await axios.get(`${import.meta.env.VITE_BASE_URL}discover/movie?sort_by=popularity.desc`, { params: params, headers: headers })
      setPopularMovies(response.data.results ?? [])
      if (query && response.data.results) {
        await updateSearchCount(query, response.data.results[0])
      }
    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching movies. Try again later")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearch)
  }, [debouncedSearch])

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2 className='mt-[20px]'>All Movies</h2>
          {isLoading ? <Spinner /> : errorMessage ? <p className='text-red-500'>
            {errorMessage}
          </p> : (
            <ul>
              {popularMovies?.map((item: TMovieResponse) => (
                <MovieTile key={item.id} title={item.title} description={item.overview} poster={item.poster_path} vote={item.vote_average} year={item.release_date.split("-")[0]} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
