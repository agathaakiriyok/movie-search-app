import { useState, useEffect } from 'react'
import type { Movie } from '../types/movie'

const STORAGE_KEY = 'favorites'

function readFromStorage(): Movie[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Movie[]) : []
  } catch {
    return []
  }
}

function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>(readFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(movie: Movie) {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }

  function removeFavorite(id: number) {
    setFavorites((prev) => prev.filter((m) => m.id !== id))
  }

  function isFavorite(id: number): boolean {
    return favorites.some((m) => m.id === id)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}

export default useFavorites
