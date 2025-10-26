import React, { useState } from 'react'
import './App.css'
import Search from './components/Search/Search'
import axios from 'axios'

function App(): React.JSX.Element {

  const params = { api_key: import.meta.env.VITE_TBMD_API_KEY }
  const headers = {'Authorization': import.meta.env.VITE_TMMD_READ_ACCESS_TOKEN}
  
  const axiosGet = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}movie/${searchTerm}`, { params: params, headers: headers })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const [searchTerm, setSearchTerm] = useState("")
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero-img.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  )
}

export default App
