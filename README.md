# Movie Explorer

Веб-приложение для поиска фильмов, просмотра деталей и сохранения избранного.

## Стек

- React 18 + TypeScript
- Vite
- React Router v6
- CSS Modules
- TMDB API

## Функционал

- Поиск фильмов по названию (запуск по кнопке или Enter)
- Фильтрация результатов по жанру, году, минимальному рейтингу
- Сортировка по популярности, рейтингу или дате выхода
- Страница деталей: постер, описание, жанры, длительность
- Избранное с сохранением в LocalStorage (не сбрасывается после перезагрузки)
- Адаптивный интерфейс (десктоп и мобиль)
- Обработка загрузки, ошибок и пустых состояний

## Запуск

```bash
# 1. Получите токен на https://www.themoviedb.org/settings/api
# 2. Создайте файл .env в корне проекта:
VITE_TMDB_TOKEN=ваш_токен

npm install
npm run dev
```

## Архитектура

```
src/
  api/          — слой работы с TMDB API (все fetch-запросы в одном месте)
  components/   — переиспользуемые компоненты: SearchBar, MovieCard, Loader…
  hooks/        — кастомные хуки: useFavorites (LocalStorage + state)
  pages/        — страницы: Home, Movies, MovieDetails, Favorites, NotFound
  types/        — TypeScript-типы для фильмов и API-ответов
  utils/        — вспомогательные функции (toMovie и др.)
```

## Deploy
https://movie-search-app-c3qm-47cdag8oh-agathaakiriyoks-projects.vercel.app/
