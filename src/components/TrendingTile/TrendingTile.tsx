interface ITrendingTile {
    poster: string
    rank: number
}

export function TrendingTile({ poster, rank }: ITrendingTile): React.JSX.Element {
    return (
        <li>
            <p>{rank}</p>
            <img src={poster} />
        </li>
    )
}