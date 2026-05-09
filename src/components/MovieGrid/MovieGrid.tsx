import type { Movie } from '../../types/movie'
import MovieCard from '../MovieCard/MovieCard'
import styles from './MovieGrid.module.css'

type MovieGridProps = {
  movies: Movie[]
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid
