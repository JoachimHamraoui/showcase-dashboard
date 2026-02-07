# Showcase Dashboard

A Next.js app for managing and showcasing projects with authentication, a dashboard, and image uploads.

## Features

- Auth with email/password and Google OAuth (Better Auth)
- Project dashboard with create/edit/delete flows
- Cloudinary image upload endpoint
- Bot/rate‑limit protection for auth routes (Arcjet)
- Drizzle ORM with Postgres

## Tech stack

- Next.js (App Router) + React 19
- TypeScript + Tailwind CSS
- Drizzle ORM + Postgres
- Better Auth
- Cloudinary
- Radix UI

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – build for production
- `npm run start` – run production server
- `npm run lint` – lint
- `npm run db:generate` – generate migrations
- `npm run db:migrate` – run migrations
- `npm run db:push` – push schema to DB
- `npm run db:studio` – open Drizzle Studio

## Environment variables

Create a `.env` file with:

```bash
DATABASE_URL=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ARCJET_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
# Optional in production
VERCEL_URL=
```

## App routes

- `/` public landing page
- `/auth/login` sign in / sign up
- `/dashboard` projects dashboard (requires auth)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

MIT — see [LICENSE](LICENSE).
