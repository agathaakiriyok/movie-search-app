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

export async function getMovieCredits(id: number): Promise<ApiCreditsResponse> {
  return request<ApiCreditsResponse>(`/movie/${id}/credits`)
}

export function getPosterUrl(posterPath: string | null, size: 'w300' | 'w500' | 'original' = 'w500'): string {
  if (!posterPath) return '/placeholder-poster.png'
  return `https://image.tmdb.org/t/p/${size}${posterPath}`
}
