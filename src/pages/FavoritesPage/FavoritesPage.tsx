import useFavorites from '../../hooks/useFavorites'
import MovieGrid from '../../components/MovieGrid/MovieGrid'
import styles from './FavoritesPage.module.css'

function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Избранное</h1>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>♡</p>
          <p className={styles.emptyText}>Вы ещё не добавили ни одного фильма в избранное.</p>
          <p className={styles.emptyHint}>Нажмите «Добавить в избранное» на странице фильма.</p>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  )
}

export default FavoritesPage
