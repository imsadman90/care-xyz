# Care.xyz

Live demo: https://care-xyz-new.vercel.app/

## Brief

Care.xyz is a caregiving marketplace built with Next.js and Tailwind CSS. It includes user authentication, service listings, booking flow, an admin dashboard, and a contact form that sends messages via SMTP using Nodemailer.

## Tech stack

- Frontend: Next.js + React
- Styling: Tailwind CSS
- Animations / smooth UX: Framer Motion and Lenis for scroll smoothing
- Backend: API routes (Next.js) + MongoDB for persistence
- Email: Nodemailer (secure contact form sends to the support inbox)

## Security & public repo guidance

This repository contains configuration that requires secrets (database URIs, SMTP credentials, OAuth keys). Do NOT commit any secrets to the repository. Keep these values in a local `.env` file that is excluded from version control (see `.gitignore`). The app expects the following sensitive environment variables:

- `MONGODB_URI`
- `EMAIL_USER` and `EMAIL_PASS` (use an App Password for Gmail)
- `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY`s

If you plan to deploy publicly (for example on Vercel), set these variables in the hosting provider's environment settings rather than committing them to source control.