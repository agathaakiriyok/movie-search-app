import { Link } from 'react-router-dom'
import { getPosterUrl } from '../../api/moviesApi'
import type { Movie } from '../../types/movie'
import styles from './MovieCard.module.css'

type MovieCardProps = {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      <img
        src={getPosterUrl(movie.poster_path, 'w300')}
        alt={movie.title}
        className={styles.poster}
        loading="lazy"
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          <span className={styles.year}>
            {movie.release_date ? movie.release_date.slice(0, 4) : '—'}
          </span>
          <span className={styles.rating}>
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
