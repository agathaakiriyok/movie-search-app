import type { Genre } from '../../types/movie'
import styles from './MovieFilters.module.css'

export type FilterState = {
  genreId: number | null
  year: string
  minRating: number
  sortBy: 'popularity' | 'rating' | 'date'
}

type MovieFiltersProps = {
  filters: FilterState
  genres: Genre[]
  availableYears: string[]
  onChange: (filters: FilterState) => void
}

function MovieFilters({ filters, genres, availableYears, onChange }: MovieFiltersProps) {
  function update(partial: Partial<FilterState>) {
    onChange({ ...filters, ...partial })
  }

  return (
    <div className={styles.filters}>
      <select
        className={styles.select}
        value={filters.genreId ?? ''}
        onChange={(e) => update({ genreId: e.target.value ? Number(e.target.value) : null })}
      >
        <option value="">Все жанры</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filters.year}
        onChange={(e) => update({ year: e.target.value })}
      >
        <option value="">Любой год</option>
        {availableYears.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filters.minRating}
        onChange={(e) => update({ minRating: Number(e.target.value) })}
      >
        <option value={0}>Любой рейтинг</option>
        <option value={5}>от 5</option>
        <option value={6}>от 6</option>
        <option value={7}>от 7</option>
        <option value={8}>от 8</option>
      </select>

      <select
        className={styles.select}
        value={filters.sortBy}
        onChange={(e) => update({ sortBy: e.target.value as FilterState['sortBy'] })}
      >
        <option value="popularity">По популярности</option>
        <option value="rating">По рейтингу</option>
        <option value="date">По дате</option>
      </select>
    </div>
  )
}

export default MovieFilters
