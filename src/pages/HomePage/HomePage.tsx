import { useState, useEffect } from 'react'
import { getPopularMovies } from '../../api/moviesApi'
import type { Movie } from '../../types/movie'
import MovieGrid from '../../components/MovieGrid/MovieGrid'
import styles from './HomePage.module.css'

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true)
        setError(null)

        const data = await getPopularMovies()
        setMovies(data.results)      
      } catch {
        setError('Не удалось загрузить фильмы. Проверьте подключение и попробуйте позже.')
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, []) 

  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Movie Explorer</h1>
        <p className={styles.heroSubtitle}>
          Открывай новые фильмы, следи за популярными новинками
          и сохраняй любимые в избранное
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Популярные фильмы</h2>

        {loading && (
          <p className={styles.statusText}>Загрузка...</p>
        )}

        {error && (
          <p className={styles.errorText}>{error}</p>
        )}

        {!loading && !error && (
          <MovieGrid movies={movies} />
        )}
      </section>

    </div>
  )
}

export default HomePage
