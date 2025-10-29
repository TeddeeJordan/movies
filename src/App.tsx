/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search/Search'
import axios from 'axios'
import { MovieTile } from './components/MovieTile/MovieTile'
import type { TMovieResponse } from './types/tbmdTypes'
import { Spinner } from "flowbite-react";
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './utils/appwrite'
import type { TTrendingMovie } from './types/appwriteType'
import { TrendingTile } from './components/TrendingTile/TrendingTile'

function App(): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessageTrending, setErrorMessageTrending] = useState('')
  const [popularMovies, setPopularMovies] = useState<TMovieResponse[] | undefined>(undefined)
  const [trendingMovies, setTrendingMovies] = useState<TTrendingMovie[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTrending, setIsLoadingTrending] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useDebounce(() => setDebouncedSearch(searchTerm), 500, [searchTerm])

  const params = { api_key: import.meta.env.VITE_TBMD_API_KEY }
  const headers = { 'Authorization': `Bearer ${import.meta.env.VITE_TMMD_READ_ACCESS_TOKEN}` }

  const fetchMovies = async (query: string = '') => {
    setIsLoading(true)
    try {
      const response = query ? await axios.get(`${import.meta.env.VITE_BASE_URL}search/movie?query=${encodeURIComponent(query)}`, { params: params, headers: headers }) : await axios.get(`${import.meta.env.VITE_BASE_URL}discover/movie?sort_by=popularity.desc`, { params: params, headers: headers })
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

  const loadTrendingMovies = async () => {
    setIsLoadingTrending(true)
    try {
      const result = await getTrendingMovies()
      setTrendingMovies(result)
      console.log(result)
    } catch (error) {
      console.error(error)
      setErrorMessageTrending("Error fetching trending movies. Try again later")
    } finally {
      setIsLoadingTrending(false)
    }
  }

  useEffect(() => {
    void fetchMovies(debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    void loadTrendingMovies()
  }, [])

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {isLoadingTrending ? <Spinner /> : errorMessageTrending ? <p className='text-red-500'>
          {errorMessageTrending}
        </p> : (
          <section className='trending'>
            <ul>
              {trendingMovies?.map((item: TTrendingMovie, index) => (
                <TrendingTile key={item.movieID} poster={item.poster} rank={index + 1} />
              ))}
            </ul>
          </section>
        )}
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
