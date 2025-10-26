export interface IMovieData {
    title: string
    description: string
    poster: string
    vote: number
}

export function MovieTile({ title, description, poster, vote }: IMovieData): React.JSX.Element {
    return (
        <div>
            <p className='text-red-500'>{title}</p>
            <p className='text-red-500'>{description}</p>
            <img src={`${import.meta.env.VITE_IMAGE_URL}${poster}`} alt={`Poster for ${title}`} />
            <p className='text-red-500'>{vote}</p>
        </div>
    )
}