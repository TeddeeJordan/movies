interface IMovieData {
    title: string
    description: string
    poster: string
    vote: number
    key: number
}

export function MovieTile({ title, description, poster, vote, key }: IMovieData): React.JSX.Element {
    return (
        <div className="movie-card" key={key}>
            {/* <p className='text-red-500'>{title}</p>
            <p className='text-red-500'>{description}</p>
            <p className='text-red-500'>{`${import.meta.env.VITE_IMAGE_URL}${poster}`}</p> */}
            <img src={poster ? `${import.meta.env.VITE_IMAGE_URL}/w500${poster}` : '/no-poster.png'} alt={`Poster for ${title}`} />
            {/* <p className='text-red-500'>{vote}</p> */}
        </div>
    )
}