import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieById, getPosterUrl } from '../../api/moviesApi'
import type { MovieDetails } from '../../types/movie'
import useFavorites from '../../hooks/useFavorites'
import Loader from '../../components/Loader/Loader'
import { toMovie } from '../../utils/movieUtils'
import styles from './MovieDetailsPage.module.css'

function MovieDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    if (!id) return

    async function loadMovie() {
      try {
        setLoading(true)
        setError(null)
        const data = await getMovieById(Number(id))
        setMovie(data)
      } catch {
        setError('Не удалось загрузить информацию о фильме.')
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  if (loading) {
    return <Loader />
  }
  
  if (error || !movie) {
    return <p className={styles.errorText}>{error ?? 'Фильм не найден.'}</p>
  }

  const favorited = isFavorite(movie.id)

  function toggleFavorite() {
    if (favorited) {
      removeFavorite(movie!.id)
    } else {
      addFavorite(toMovie(movie!))
    }
  }

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин`
    : '—'

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className={styles.content}>
        <div className={styles.posterWrapper}>
          <img
            src={getPosterUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className={styles.poster}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>

          {movie.original_title !== movie.title && (
            <p className={styles.originalTitle}>{movie.original_title}</p>
          )}

          <div className={styles.meta}>
            <span className={styles.rating}>★ {movie.vote_average.toFixed(1)}</span>
            <span className={styles.metaItem}>{year}</span>
            <span className={styles.metaItem}>{runtime}</span>
          </div>

          {movie.genres.length > 0 && (
            <div className={styles.genres}>
              {movie.genres.map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <p className={styles.overview}>{movie.overview}</p>
          )}

          <button
            className={`${styles.favoriteButton} ${favorited ? styles.favoriteButtonActive : ''}`}
            onClick={toggleFavorite}
          >
            {favorited ? '♥ В избранном' : '♡ Добавить в избранное'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
