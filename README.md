# Job applications frontend

## TODO

- [x] Skapa enkel mall (HTML, CSS, JS)
- [x] Visa en lista med jobb (inte autentiserad)
- [x] Visa ett jobb (inte autentiserad)
- [x] Skapa jobbansökan (inte autentiserad)
- [x] Logga in (inte autentiserad)
- [ ] Visa jobbansökningar (autentiserad)
- [ ] Registrera användare (inte autentiserad)
- [ ] Skapa jobb (autentiserad)
- [ ] Ta bort jobb (autentiserad)

## Backend

Backend API finns på [GitHub](https://github.com/linus-rudbeck/JobApplicationAPI)

### API-endpoints

- `GET /api/jobs` - Hämta alla jobb
- `GET /api/jobs/:id` - Hämta ett jobb
- `POST /api/applications` - Skapa en jobbansökan
- `POST /login` - Logga in
- `POST /manage/info` - Hämta information om inloggad användare
- `POST /refresh` - Uppdatera access token
- `GET /api/applications` - Hämta alla jobbansökningar
- `POST /register` - Registrera användare
- `POST /api/jobs` - Skapa ett jobb
- `DELETE /api/jobs/:id` - Ta bort ett jobb
