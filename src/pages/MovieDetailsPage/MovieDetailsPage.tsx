import { useParams } from 'react-router-dom'

function MovieDetailsPage() {
  const { id } = useParams()

  return (
    <div>
      <h2>Фильм #{id}</h2>
    </div>
  )
}

export default MovieDetailsPage
