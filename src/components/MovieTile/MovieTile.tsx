interface IMovieData {
    title: string
    description: string
    poster: string
    vote: number
    year: string
}

export function MovieTile({ title, description, poster, vote, year }: IMovieData): React.JSX.Element {
    return (
        <div className="movie-card">
            <img src={poster ? `${import.meta.env.VITE_IMAGE_URL}/w500${poster}` : '/no-poster.png'} alt={`Poster for ${title}`} />
            <div className="mt-4">
                <h3>{title}</h3>
            </div>
            <div className="content">
                <div className="rating">
                    <img src="/star.svg" alt="star" />
                    <p>{vote ? vote.toFixed(1) : "N/A"}</p>
                    <span>•</span>
                    <p>{year ? year : "N/A"}</p>
                </div>
                {description && <p className="text-white">{description}</p>}
            </div>
        </div>
    )
}