import type { Movie, MovieDetails } from '../types/movie'

export function toMovie(details: MovieDetails): Movie {
  return {
    id: details.id,
    title: details.title,
    original_title: details.original_title,
    overview: details.overview,
    poster_path: details.poster_path,
    backdrop_path: details.backdrop_path,
    release_date: details.release_date,
    vote_average: details.vote_average,
    vote_count: details.vote_count,
    genre_ids: details.genres.map((g) => g.id),
    popularity: 0,
  }
}
