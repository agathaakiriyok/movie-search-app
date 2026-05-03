import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>
      <h2>404 — Страница не найдена</h2>
      <Link to="/">На главную</Link>
    </div>
  )
}

export default NotFoundPage
