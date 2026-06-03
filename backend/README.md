# Burger Backend - Java Spring Boot

A scalable, production-ready burger ordering backend built with Spring Boot 3.2.

## Architecture

```
src/main/java/com/burgers/
├── config/          → Configuration classes (Security, Redis, WebSocket, CORS)
├── controller/      → REST API endpoints
├── dto/             → Request/Response DTOs with validation
├── exception/       → Global exception handling
├── model/           → MongoDB document models
├── repository/      → Spring Data MongoDB repositories
├── security/        → JWT authentication, rate limiting
└── service/         → Business logic layer
```

## Features

- **JWT Authentication** with access + refresh tokens (cookie-based)
- **Role-Based Access Control** (USER / ADMIN)
- **Order Management** with full lifecycle (PLACED → CONFIRMED → PREPARING → DELIVERING → DELIVERED)
- **Redis Caching** for menu items
- **WebSocket Notifications** for real-time order status updates
- **Razorpay Payment Integration**
- **Cloudinary Image Uploads**
- **Rate Limiting** (60 requests/minute per IP)
- **Swagger/OpenAPI Documentation** at `/swagger-ui.html`
- **Docker Support** with MongoDB and Redis containers
- **Email Notifications** (verification + order confirmation)

## Quick Start

### With Docker (Recommended)

```bash
# Copy env file and fill in your values
cp .env.example .env

# Start all services
docker-compose up -d

# App runs at http://localhost:8080
# Swagger UI at http://localhost:8080/swagger-ui.html
# Mongo Express UI at http://localhost:8081
```

### Without Docker

Prerequisites: Java 17+, Maven, MongoDB, Redis

```bash
# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register (multipart with avatar) |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/verify?code=` | Verify email |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get profile |
| PUT | `/api/user/profile` | Update profile |
| GET | `/api/user/avatar` | Get avatar URL |

### Burgers (Menu)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/burgers/menu` | Get all available burgers |
| GET | `/api/burgers/menu/{id}` | Get burger by ID |
| GET | `/api/burgers/menu/category/{cat}` | Filter by category |
| GET | `/api/burgers/menu/search?q=` | Search burgers |
| POST | `/api/burgers` | Add burger (Admin) |
| PUT | `/api/burgers/{id}` | Update burger (Admin) |
| DELETE | `/api/burgers/{id}` | Delete burger (Admin) |
| PATCH | `/api/burgers/{id}/toggle` | Toggle availability (Admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order |
| GET | `/api/orders/my-orders` | User's order history |
| GET | `/api/orders/{id}` | Get order details |
| PATCH | `/api/orders/{id}/cancel` | Cancel order |
| PATCH | `/api/orders/{id}/status?status=` | Update status (Admin) |
| GET | `/api/orders/admin/all?status=` | All orders by status (Admin) |

### Payment
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payment/key` | Get Razorpay key |
| POST | `/api/payment/checkout` | Create payment order |
| POST | `/api/payment/verification` | Verify payment callback |

### WebSocket
- Connect to: `ws://localhost:8080/ws`
- Subscribe: `/user/queue/orders` (per-user order updates)
- Subscribe: `/topic/orders` (global order updates)

## Tech Stack

- **Java 17** + **Spring Boot 3.2**
- **Spring Security** + JWT
- **Spring Data MongoDB**
- **Spring Data Redis** (Lettuce)
- **Spring WebSocket** (STOMP)
- **Razorpay Java SDK**
- **Cloudinary SDK**
- **Bucket4j** (Rate Limiting)
- **SpringDoc OpenAPI** (Swagger)
- **Lombok**
- **Docker** + Docker Compose
