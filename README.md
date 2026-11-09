# NewsReader

A React + Vite NewsReader assignment project with demo authentication, protected routes, user-scoped saved articles, and role-aware admin UI.

## Run locally

1. Install Node.js 18+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your NY Times API key:
   ```ini
   VITE_NY_TIMES_API_KEY=your_actual_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite (usually http://localhost:5173).

Never commit `.env`. It is ignored by Git. Configure the same variable in Vercel's project environment-variable settings and redeploy after changing it.

## Demo login

The assignment starter does not include a backend or user database. For demonstration only, enter any non-empty username and password and select either Regular User or Admin User. Saved articles are stored separately by username in browser local storage; the current login is stored in session storage.

- `/saved` requires a logged-in user.
- `/admin` requires the demo `admin` role.
- The admin page displays saved articles grouped by username.

## Important security limitation before production

`VITE_*` variables are embedded into the client-side JavaScript bundle. A `.env` file prevents accidental source-code commits, but it does **not** make a Vite `VITE_NY_TIMES_API_KEY` secret after deployment. For a genuinely secret API key, create a server-side API proxy (for example, a Vercel Function), store the key as a non-`VITE_` server environment variable, and have the browser call that function.

Likewise, this project's login and role selection are intentionally a classroom demo, not secure production authentication. Anyone can select the admin role, and browser storage can be modified by the user. A production app must authenticate credentials on a server, hash passwords, issue secure HttpOnly/SameSite cookies or equivalent sessions, and enforce authorization on every server-side data/API operation. Client-side route guards improve navigation UX but are not a security boundary.

## Useful commands

```bash
npm run lint
npm run build
```

## Deploy to Vercel

Import the GitHub repository in Vercel. Add `VITE_NY_TIMES_API_KEY` in Project Settings → Environment Variables for the environments you use, then deploy. For production-grade secrecy, use the server-side proxy approach described above instead of exposing the key through a `VITE_` variable.
