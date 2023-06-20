# API-Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Homepage / Dashboard

- `GET /api/`
- `POST /api/stock/:stockId/buy`
- `DELETE /api/stock/:stockId/sell`

## Stock Detail

- `GET /api/stock/:stockId`
- `GET /api/stock/:stockId/notes`

## Notes

- `GET /api/notes`
- `GET /api/notes/:noteId`
- `POST /api/notes/new`
- `DELETE /api/notes/:noteId/delete`
- `PUT /api/notes/:noteId`

## Watchlists

- `GET /api/watchlists`
- `GET /api/watchlists/:watchListId`
- `POST /api/watchlists/new`
- `DELETE /api/watchlists/:watchListId`
- `PUT /api/watchlists/:watchListId`
