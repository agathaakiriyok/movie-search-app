export type Genre = {
  id: number
  name: string
}

export type ProductionCountry = {
  iso_3166_1: string
  name: string
}

export type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export type Movie = {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
}

export type MovieDetails = {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genres: Genre[]
  runtime: number | null
  production_countries: ProductionCountry[]
  budget: number
  revenue: number
}

export type PaginatedResponse<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type ApiGenresResponse = {
  genres: Genre[]
}

export type ApiCreditsResponse = {
  id: number
  cast: CastMember[]
}
