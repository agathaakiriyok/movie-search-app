import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies, getGenres, discoverMovies } from '../../api/moviesApi'
import type { Movie, Genre } from '../../types/movie'
import SearchBar from '../../components/SearchBar/SearchBar'
import MovieGrid from '../../components/MovieGrid/MovieGrid'
import MovieFilters, { type FilterState } from '../../components/MovieFilters/MovieFilters'
import Loader from '../../components/Loader/Loader'
import styles from './MoviesPage.module.css'

const DEFAULT_FILTERS: FilterState = {
  genreId: null,
  year: '',
  minRating: 0,
  sortBy: 'popularity',
}

const CURRENT_YEAR = new Date().getFullYear()
const DISCOVER_YEARS = Array.from(
  { length: CURRENT_YEAR - 1969 },
  (_, i) => String(CURRENT_YEAR - i),
)

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres)).catch(() => {})
  }, [])

  // Режим поиска: запрос по названию
  useEffect(() => {
    if (!query) {
      setMovies([])
      return
    }

    async function runSearch() {
      try {
        setLoading(true)
        setError(null)
        setFilters(DEFAULT_FILTERS)
        const data = await searchMovies(query)
        setMovies(data.results)
      } catch {
        setError('Не удалось выполнить поиск. Проверьте подключение.')
      } finally {
        setLoading(false)
      }
    }

    runSearch()
  }, [query])

  // Режим обзора: запрос с фильтрами через /discover когда нет поискового запроса
  useEffect(() => {
    if (query) return

    async function runDiscover() {
      try {
        setLoading(true)
        setError(null)
        const data = await discoverMovies(filters)
        setMovies(data.results)
      } catch {
        setError('Не удалось загрузить фильмы.')
      } finally {
        setLoading(false)
      }
    }

    runDiscover()
  }, [query, filters])

  function handleSearch(newQuery: string) {
    setSearchParams({ q: newQuery })
  }

  function handleClearSearch() {
    setSearchParams({})
  }

  const isSearchMode = !!query

  // В режиме поиска — только жанры из результатов; в режиме обзора — все жанры
  const activeGenreIds = new Set(movies.flatMap((m) => m.genre_ids))
  const availableGenres = isSearchMode
    ? genres.filter((g) => activeGenreIds.has(g.id))
    : genres

  // В режиме поиска — годы из результатов; в режиме обзора — статичный список
  const availableYears = isSearchMode
    ? ([...new Set(movies.map((m) => m.release_date?.slice(0, 4)).filter(Boolean))].sort().reverse() as string[])
    : DISCOVER_YEARS

  // В режиме поиска — фильтруем на клиенте; в режиме обзора — API уже отфильтровал
  const filteredMovies = isSearchMode
    ? movies
        .filter((m) => !filters.genreId || m.genre_ids.includes(filters.genreId))
        .filter((m) => !filters.year || m.release_date?.startsWith(filters.year))
        .filter((m) => m.vote_average >= filters.minRating)
        .sort((a, b) => {
          if (filters.sortBy === 'rating') return b.vote_average - a.vote_average
          if (filters.sortBy === 'popularity') return b.popularity - a.popularity
          return (b.release_date ?? '').localeCompare(a.release_date ?? '')
        })
    : movies

  return (
    <div className={styles.page}>
      <section className={styles.searchSection}>
        <h1 className={styles.title}>Поиск фильмов</h1>
        <SearchBar key={query} onSearch={handleSearch} initialValue={query} />
        {isSearchMode && (
          <button className={styles.clearSearch} onClick={handleClearSearch}>
            × Очистить поиск
          </button>
        )}
      </section>

      <MovieFilters
        filters={filters}
        genres={availableGenres}
        availableYears={availableYears}
        onChange={setFilters}
      />

      <section className={styles.results}>
        {loading && <Loader />}
        {error && <p className={styles.errorText}>{error}</p>}

        {!loading && !error && isSearchMode && movies.length === 0 && (
          <p className={styles.statusText}>По запросу «{query}» ничего не найдено.</p>
        )}

        {!loading && !error && isSearchMode && movies.length > 0 && filteredMovies.length === 0 && (
          <p className={styles.statusText}>Нет фильмов, подходящих под выбранные фильтры.</p>
        )}

        {!loading && !error && filteredMovies.length > 0 && (
          <MovieGrid movies={filteredMovies} />
        )}
      </section>
    </div>
  )
}

export default MoviesPage
