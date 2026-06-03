# Burger Ordering App (React + Vite + Express)

A full-stack burger ordering demo app with a Vite + React frontend and an Express/MongoDB backend. It includes user auth, image uploads (Cloudinary), and Razorpay payment integration.

**Features**
- User registration & login (Firebase auth is used on the frontend)
- Browse menu, add to cart, place orders
- Admin area for managing burger data (API under `/api/burgers`)
- Payment integration via Razorpay (`/api/getkey` + payment routes)
- Image upload support using Cloudinary

**Tech stack**
- Frontend: React, Vite, Tailwind (styles), Chakra UI components, React Router
- Backend: Node.js, Express, MongoDB (Mongoose), Razorpay, Cloudinary

**Repository layout (key files)**
- [backend/index.js](backend/index.js) - Express app entry, routes mounting and DB connection
- [backend/routes/paymentRoute.js](backend/routes/paymentRoute.js) - Payment endpoints
- [backend/routes/user.router.js](backend/routes/user.router.js) - User endpoints
- [backend/routes/burgerData.router.js](backend/routes/burgerData.router.js) - Burger data API
- [backend/config/databse.js](backend/config/databse.js) - MongoDB connection (uses `MONGO_URI`)
- [src/App.jsx](src/App.jsx) - Frontend routes and app composition
- [src/firebase.js](src/firebase.js) - Firebase config used for frontend auth

## Quickstart

Prerequisites:
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (URI)
- Razorpay account (API key & secret)
- Cloudinary account (cloud name, API key, API secret)

1) Install frontend deps (project root)

```bash
npm install
```

2) Install backend deps

```bash
cd backend
npm install
```

3) Environment variables (backend)
Create a `.env` file in `backend/` with at least the following keys:

- `MONGO_URI` - MongoDB connection string
- `RAZORPAY_API_KEY` - Razorpay key id
- `RAZORPAY_API_SECRET` - Razorpay key secret
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - Cloudinary credentials
- `JWT_SECRET` - secret for signing JSON Web Tokens (if used by auth)
- Any email / nodemailer credentials used by `utils/sendMail.js` (if sending emails)

Note: The frontend currently includes a `src/firebase.js` file with firebase config values. For production, consider moving these into environment variables.

4) Run the app

Start backend (in `backend/`):

```bash
cd backend
npm run dev
```

Start frontend (project root):

```bash
npm run dev
```

Frontend default dev server is Vite (usually on `http://localhost:5173`).
Backend default port is `3000` (see `backend/index.js`).

## Available scripts
- Frontend (root): `npm run dev` — start Vite dev server
- Frontend: `npm run build` — build production assets
- Backend (backend/): `npm run dev` — start server with `nodemon`

## API Endpoints (examples)
- `GET /api/getkey` — returns the public Razorpay key (used by frontend to create payments)
- `POST /api/...` — payment routes and user/burger routes mounted under `/api`

## Notes & next steps
- The frontend currently contains a committed `src/firebase.js` with production keys — consider moving to env variables or using a safer config for public repos.
- Add a `.env.example` in `backend/` documenting required env vars (recommended)
- Add tests and CI for better stability

## License
This repository has no license specified. Add a `LICENSE` file if you intend to open source it.

---
If you'd like, I can:
- add a `backend/.env.example` with the exact variables,
- remove secrets in `src/firebase.js` and replace with an env-based example,
- or commit the README changes and update the todo list.
 
## In-depth Project Explanation

### High-level architecture
- Frontend (client): A React single-page application built with Vite. It handles UI, routing, cart state, and calls the backend APIs for authenticated actions and payments. Firebase is used on the client for user authentication integration points (see `src/firebase.js`).
- Backend (server): An Express app (entry: `backend/index.js`) exposing REST endpoints under `/api`. It connects to MongoDB via Mongoose and handles user management, burger/menu CRUD (admin), order processing, and payment interactions with Razorpay. It also handles file uploads via Multer and Cloudinary for image storage.

### Data models (overview)
The repository contains Mongoose models under `backend/models/` including:
- `user.model.js` — user schema storing credentials, profile info, roles/flags for admin, and refresh tokens/cookie references as needed.
- `burgerData.model.js` — burger/menu item schema with fields like title, description, price, image URL, and category.
- `paymentModel.js` — order/payment schema capturing amount, user reference, payment status, and Razorpay-related ids.

### Authentication & Authorization
- Client: `src/firebase.js` sets up Firebase SDK which the frontend uses for login/registration flows.
- Server: Custom JWT-based protection is implemented in `backend/middleware/auth.middleware.js`. The middleware expects `accessToken` and `refreshToken` cookies. If `accessToken` is missing but `refreshToken` is valid, the middleware issues a new short-lived access token using `backend/utils/generateAccessToken.js` and sets it as a cookie.
- Secrets: The server uses `SECRET_KEY_ACCESS_TOKEN` and `SECRET_KEY_REFRESH_TOKEN` from environment variables to sign and verify tokens.

### Payment flow (Razorpay)
- The frontend requests the public API key from `GET /api/getkey` (server reads `RAZORPAY_API_KEY` from env).
- The checkout flow uses the Razorpay SDK on the client to create payment windows; the server-side `backend/utils/razorpay.js` initializes the Razorpay instance using `RAZORPAY_API_KEY` and `RAZORPAY_API_SECRET`.
- Order/payment state is recorded in the `paymentModel` (backend) and updated after webhook or verification.

### Image uploads (Cloudinary)
- Image uploads are handled by a combination of Multer (for temporary disk storage) and `backend/utils/cloudinary.utils.js` which uploads files to Cloudinary and cleans up local temporary files.

### Important environment variables
Create a `.env` file in the `backend/` folder with at least:

- `MONGO_URI` — MongoDB connection string
- `SECRET_KEY_ACCESS_TOKEN` — JWT access token secret
- `SECRET_KEY_REFRESH_TOKEN` — JWT refresh token secret
- `RAZORPAY_API_KEY` — Razorpay key id
- `RAZORPAY_API_SECRET` — Razorpay key secret
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary creds
- Any SMTP / nodemailer creds used by `backend/utils/sendMail.js` (if used)

### Developer notes & recommended improvements
- Move Firebase config values out of `src/firebase.js` into environment variables or a `.env` used by the build tooling — avoid committing secrets.
- Add `backend/.env.example` documenting the required variables.
- Harden cookies for production: set `secure: true` and a stricter `sameSite` policy when serving over HTTPS.
- Consider centralizing auth logic and adding refresh-token rotation to improve security.
- Add basic API integration tests for auth, payments, and CRUD routes.

### Deployment
- Frontend: Build with `npm run build` and host static output on Netlify, Vercel, or any static hosting. Ensure environment variables for Firebase are provided by the host.
- Backend: Deploy `backend/` to Heroku, Render, or any Node host. Provide the `.env` variables and ensure the MongoDB Atlas (or other) instance is reachable.

---
I've expanded the README with an in-depth explanation of architecture, models, auth/payment/upload flows, env vars, and recommended next steps. I'll mark the README expansion as completed next.

## Payment gateway — Razorpay (in depth)

Overview:
- Razorpay is used to handle payments from the frontend. The server stores credentials in environment variables and exposes endpoints that the client calls to initiate and verify payments.

Server-side responsibilities:
- Provide the public key to the frontend via `GET /api/getkey` so the client can initialize the Razorpay SDK ([backend/index.js](backend/index.js)).
- Create an order on Razorpay using the server SDK (`instance.orders.create`) with fields: `amount` (in paise), `currency`, `receipt` (unique), and optional notes. The server should save the returned `razorpay_order_id` in the DB alongside the order receipt.
- After the client completes payment, verify the payment signature server-side using HMAC SHA256 with your `RAZORPAY_API_SECRET` to ensure the `razorpay_order_id|razorpay_payment_id` signature matches the header sent by Razorpay.
- Optionally capture payments (if not auto-captured) and mark order status in your `paymentModel`.
- Use webhooks for async confirmation: configure a webhook secret in Razorpay dashboard and validate incoming webhook payload signatures to protect against spoofed requests.

Client-side responsibilities:
- Request the public key from `GET /api/getkey` then call `Razorpay` with the order details returned by the server.
- Open the Razorpay checkout; on success, send the `razorpay_payment_id`, `razorpay_order_id`, and `razorpay_signature` to your server to verify and update order status.

Important security & reliability notes:
- Never expose `RAZORPAY_API_SECRET` on client — keep it only in backend env.
- Use unique `receipt` values to provide idempotency and to help match local orders with Razorpay orders.
- Store both `razorpay_order_id` and `razorpay_payment_id` in your DB for reconciliations and refunds.
- Verify webhook signatures and respond with appropriate 2xx codes. Use idempotency in webhook handlers to avoid double-processing.

Files of interest: [backend/utils/razorpay.js](backend/utils/razorpay.js), [backend/routes/paymentRoute.js](backend/routes/paymentRoute.js)

## JSON Web Tokens (JWT) — how this app uses them

Design overview:
- This project uses a short-lived access token and a longer-lived refresh token stored as HTTP-only cookies. The server signs tokens using secrets pulled from env: `SECRET_KEY_ACCESS_TOKEN` and `SECRET_KEY_REFRESH_TOKEN`.

Token generation:
- Access tokens are generated by `backend/utils/generateAccessToken.js` and include user identifiers (e.g., `_id`, `username`, `email`). Access tokens are short-lived (example: 15 minutes) to limit exposure.
- Refresh tokens are issued at login and are longer lived. They are verified when the access token is missing/expired.

Middleware flow (`backend/middleware/auth.middleware.js`):
- On protected requests the middleware checks for an `accessToken` cookie.
- If the `accessToken` is missing but a valid `refreshToken` cookie exists, the server verifies the refresh token, re-issues a new access token, sets the `accessToken` cookie, and lets the request proceed.
- If the `accessToken` is present, the middleware verifies it and attaches the user (fetched from DB using decoded id) to `req.user`.
- On verification errors the middleware returns 401s; the code also allows the logout endpoint to proceed when the access token is expired.

Security recommendations & notes:
- Store tokens in HTTP-only cookies to mitigate XSS; set `secure: true` and a strict `sameSite` policy in production.
- Perform refresh token rotation: issue a new refresh token each time you use one and revoke the old one to reduce replay attacks.
- Persist refresh tokens server-side or as an identifier in user documents to support revocation (logout, device management).
- Use short lifetimes for access tokens and validate them in middleware with proper error handling.

Files of interest: [backend/utils/generateAccessToken.js](backend/utils/generateAccessToken.js), [backend/middleware/auth.middleware.js](backend/middleware/auth.middleware.js)

## Performance, structure & code optimizations

Current optimizations in the codebase:
- Separation of concerns: the project organizes code into `routes/`, `controllers/`, `models/`, `utils/`, and `middleware/` which makes it easier to reason about behavior and test components independently.
- Reusable utilities: `backend/utils/razorpay.js`, `backend/utils/cloudinary.utils.js`, and token utilities prevent duplication and centralize configuration.
- DB connection isolation: `backend/config/databse.js` centralizes the MongoDB connection so other modules can depend on a single connection flow.
- Temporary file cleanup: `cloudinary.utils.js` attempts to delete temp files after upload, preventing disk buildup.
- Lightweight frontend dev stack: Vite provides fast HMR and small dev feedback loop for React development.
- Client-side state: a `CartProvider` (in `src/components/Context`) centralizes cart state, minimizing prop-drilling and re-renders.

Opportunities and recommended improvements for further optimization:
- Add request validation (e.g., `Joi` or `zod`) on server endpoints to fail fast and avoid unnecessary DB operations.
- Add caching for frequently-read endpoints (e.g., menu/burger listing) using Redis or in-memory caches with TTL.
- Use HTTP/2 and compression in production to reduce payload sizes.
- Introduce rate limiting (e.g., `express-rate-limit`) and `helmet` for basic security hardening.
- Adopt structured logging (e.g., `pino` or `winston`) and correlation ids for traceability in distributed requests.
- Add integration and unit tests for auth, payment verification, and webhook handlers to prevent regressions.
- For large scale, consider horizontal scaling with a shared session / token store (Redis) and ensure DB indexes support query patterns.

Files and areas to inspect for optimization: [backend/index.js](backend/index.js), [backend/utils/cloudinary.utils.js](backend/utils/cloudinary.utils.js), [src/App.jsx](src/App.jsx), `src/components/Context`.

---
I added in-depth sections for Payment (Razorpay), JWT mechanics, and code optimizations. Next I can add a `backend/.env.example` file showing all required variables and a `README` snippet for secure production cookie settings — want me to do that now?
