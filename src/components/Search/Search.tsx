import React, { type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

interface ISearch {
    readonly searchTerm: string
    readonly setSearchTerm: Dispatch<SetStateAction<string>>
}

export default function Search({ searchTerm, setSearchTerm }: ISearch): React.JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }
  return (
      <div className='search'>
          <div>
              <img src='search.svg' alt='search' />
              <input type='text' placeholder='Search thousands of movies' value={searchTerm} onChange={handleChange} />
          </div>
      </div>
  )
}
