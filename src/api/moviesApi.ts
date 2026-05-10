import type {
  Movie,
  MovieDetails,
  PaginatedResponse,
  ApiGenresResponse,
  ApiCreditsResponse,
} from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'

const TOKEN = import.meta.env.VITE_TMDB_TOKEN

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
}
 
async function request<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)

  url.searchParams.set('language', 'ru-RU')

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const response = await fetch(url.toString(), { headers })

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}


export async function getPopularMovies(page = 1): Promise<PaginatedResponse<Movie>> {
  return request<PaginatedResponse<Movie>>('/movie/popular', {
    page: String(page),
  })
}

export async function searchMovies(query: string, page = 1): Promise<PaginatedResponse<Movie>> {
  return request<PaginatedResponse<Movie>>('/search/movie', {
    query,
    page: String(page),
    include_adult: 'false',
  })
}

export async function getMovieById(id: number): Promise<MovieDetails> {
  return request<MovieDetails>(`/movie/${id}`)
}

export async function getGenres(): Promise<ApiGenresResponse> {
  return request<ApiGenresResponse>('/genre/movie/list')
}

type DiscoverParams = {
  genreId?: number | null
  year?: string
  minRating?: number
  sortBy?: 'popularity' | 'rating' | 'date'
  page?: number
}

const SORT_MAP: Record<string, string> = {
  popularity: 'popularity.desc',
  rating: 'vote_average.desc',
  date: 'primary_release_date.desc',
}

export async function discoverMovies(params: DiscoverParams = {}): Promise<PaginatedResponse<Movie>> {
  const apiParams: Record<string, string> = {
    page: String(params.page ?? 1),
    sort_by: SORT_MAP[params.sortBy ?? 'popularity'],
    include_adult: 'false',
  }

  if (params.genreId) apiParams['with_genres'] = String(params.genreId)
  if (params.year) apiParams['primary_release_year'] = params.year
  if (params.minRating) apiParams['vote_average.gte'] = String(params.minRating)

  return request<PaginatedResponse<Movie>>('/discover/movie', apiParams)
}

export async function getMovieCredits(id: number): Promise<ApiCreditsResponse> {
  return request<ApiCreditsResponse>(`/movie/${id}/credits`)
}

export function getPosterUrl(posterPath: string | null, size: 'w300' | 'w500' | 'original' = 'w500'): string {
  if (!posterPath) return '/placeholder-poster.png'
  return `https://image.tmdb.org/t/p/${size}${posterPath}`
}
