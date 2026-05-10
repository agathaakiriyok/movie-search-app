import { useState } from 'react'
import styles from './SearchBar.module.css'

type SearchBarProps = {
  onSearch: (query: string) => void
  initialValue?: string
}

function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      onSearch(trimmed)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите название фильма..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.button} type="submit">
        Найти
      </button>
    </form>
  )
}

export default SearchBar
