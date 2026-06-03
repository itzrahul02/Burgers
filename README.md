# Burgers - Full Stack Application

A modern burger ordering platform with a **React** frontend and **Java Spring Boot** backend.

## Project Structure

```
Burgers/
├── frontend/          # React + Vite + TailwindCSS
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/           # Java 17 + Spring Boot 3.2
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── docker-compose.yml
└── README.md
```

## Tech Stack

### Frontend
- React 18 + Vite 7
- TailwindCSS 3.4
- Framer Motion (animations)
- Axios (API calls)
- React Router DOM 6

### Backend
- Java 17 + Spring Boot 3.2.5
- Spring Security + JWT (cookie-based auth)
- MongoDB (Spring Data)
- Redis (caching)
- WebSocket (STOMP - real-time order updates)
- Razorpay (payments)
- Cloudinary (image uploads)
- Bucket4j (rate limiting)

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- MongoDB 7+
- Redis 7+ (optional, for caching)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

### Backend
```bash
cd backend
# Copy .env.example to .env and fill in values
cp .env.example .env
./mvnw spring-boot:run
```
Runs on http://localhost:8080

### Docker (Backend + DB)
```bash
cd backend
docker-compose up -d
```

## API Documentation
Swagger UI available at: http://localhost:8080/swagger-ui.html
