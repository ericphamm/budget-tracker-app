# Budget Tracker App

A full-stack microservices-based budget tracking application built with **Java Spring Boot**, **React**, and **PostgreSQL**.  
This project is designed to demonstrate professional-level software development with a focus on clean architecture, scalable microservices, and modern frontend practices.

---

## 🌐 Live Demo

🔗 [https://budget-tracker-app-ericpham.vercel.app](https://budget-tracker-app-ericpham.vercel.app)

---

## 🌟 Features

### ✅ User Interface (React + Tailwind CSS)
- Add, delete, and filter transactions
- Dynamic summary: Income, Expenses, Balance
- Pagination, filtering, and keyword search
- Responsive and accessible UI
- Transaction type icons and color-coded styling
- Backend connection via REST API

### ✅ Backend (Spring Boot - Microservices)
**Transaction Service**
- Built with **Spring Boot 3.5**
- Data stored in **PostgreSQL**
- RESTful API with:
  - ✅ Create a transaction (POST)
  - ✅ Get all transactions (GET)
  - ✅ Delete transaction by ID (DELETE)
- Create, update, delete, and filter transactions
- Paginated endpoints
- Input validation using **Jakarta Validation API**
- Service layer for clean separation of concerns
- Repository layer with **Spring Data JPA**
- Custom queries and validation
- Test coverage using:
  - ✅ JUnit 5
  - ✅ Spring Boot Test + MockMvc
  - ✅ Integration tests for controller using MockMvc (GET, POST, DELETE)
  - ✅ Unit tests for service layer methods (filtering, search, total amount)
- Tests can be run via `./mvnw test`
- Follows REST standards (returns 201 for POST, 200 for GET/DELETE)


**Report Service**
- Built with WebFlux
- Calls transaction-service using WebClient (service-to-service communication)
- Computes total income, expenses, and balance reactively

---

## 📁 Project Structure

```
budget-tracker-app/
├── transaction-service/         # Handles transactions and database logic
│   ├── Dockerfile
│   └── src/
├── report-service/              # Calls transaction-service to compute reports
│   ├── Dockerfile
│   └── src/
├── transaction-frontend/        # React + Vite frontend
│   ├── Dockerfile
│   └── src/
├── docker-compose.yml           # Defines and runs all services
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Docker + Docker Compose
- Java 17 (for local dev without Docker)
- Node.js + npm (for frontend dev)

---

## 🐳 Run With Docker (Recommended)

This runs the full stack using Docker.

### 1. Build and start all services:

```bash
docker compose up --build
```

### 2. Services

| Service              | Port     | URL                          |
|----------------------|----------|-------------------------------|
| Transaction Service  | `8080`   | http://localhost:8080        |
| Report Service       | `8081`   | http://localhost:8081        |
| Frontend             | `5173`   | http://localhost:5173        |
| PostgreSQL DB        | `5432`   | Used internally via Docker   |

### 3. Stop and clean up:

```bash
docker compose down -v --remove-orphans
```

---

## ⚙️ Run Without Docker (Dev only)

### Backend

1. Start PostgreSQL locally (or Docker).
2. Update DB connection in `application.properties`.
3. Run both Spring Boot apps from IntelliJ or with:

```bash
cd transaction-service
mvn spring-boot:run
# In another terminal:
cd ../report-service
mvn spring-boot:run
```

### Frontend

```bash
cd transaction-frontend
npm install
npm run dev
```

---

## 🛠 Technologies

- **Backend:** Spring Boot, Spring Data JPA, WebClient (Reactive)
- **Frontend:** React, Vite, Tailwind CSS
- **Database:** PostgreSQL
- **Build Tools:** Maven, Docker, Docker Compose

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.0-success)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-4-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-blue)
![Docker](https://img.shields.io/badge/Docker-Engine-blue)

---

## 📦 Environment Variables (in Docker)

### `transaction-service`

- `SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/transactiondb`
- `SPRING_DATASOURCE_USERNAME=postgres`
- `SPRING_DATASOURCE_PASSWORD=your_secure_password`

### `report-service`

- No `.env` needed. Communicates with `transaction-service` via `http://transaction-service:8080`.

### `transaction-frontend`

- `VITE_TRANSACTION_SERVICE_API_URL=http://localhost:8080`
- `VITE_REPORT_SERVICE_API_URL=http://localhost:8081`

---

## 🧼 Useful Commands

```bash
# Rebuild everything from scratch
docker compose down -v --remove-orphans
docker compose build
docker compose up

# Prune volumes (be careful: deletes DB data!)
docker volume prune
```

---

### 📘 API Docs (Planned)

- Swagger/OpenAPI will be added with `springdoc-openapi-ui`.

---
#
## 🧪 Testing

This project includes both **unit tests** and **integration tests** to ensure correctness and reliability:

### ✅ Unit Tests
- Written using **JUnit 5** and **Mockito**
- Tests the logic of individual service methods in isolation
- Mocked the `TransactionRepository` to test:
  - `filterByAmountRange()`
  - `searchTransactions()`
  - `calculateTotalAmount()` (custom utility method)

### 🌐 Integration Tests
- Written using **MockMvc** and `@WebMvcTest`
- Tests the `TransactionController` endpoints:
  - GET `/transactions`
  - POST `/transactions`
  - DELETE `/transactions/{id}`
- Simulates real HTTP requests and checks response status and payload

```java
@WebMvcTest(TransactionController.class)
class TransactionControllerTest {
    @Test
    void testGetAllTransactions_returnsOk() { ... }

    @Test
    void testCreateTransaction_returnsCreated() { ... }

    @Test
    void testDeleteTransaction_returnsOk() { ... }
}
```

✔️ Status codes validated  
✔️ MockMvc used for simulating HTTP requests  
✔️ Learned to catch subtle issues like wrong HTTP status (e.g., using 200 instead of 201 for POST)

All tests are executed using Maven:
```bash
./mvnw test
```
or specific test methods:
```bash
./mvnw -Dtest=TransactionServiceTest#methodName test
```
---

## 📌 Author

**Eric Pham**  
👨‍💻 GitHub: [@ericphamm](https://github.com/ericphamm)  
🔗 LinkedIn: [Eric Thang Pham](https://www.linkedin.com/in/ericthangpham)

---

## 🌍 Repository

[https://github.com/ericphamm/budget-tracker-app](https://github.com/ericphamm/budget-tracker-app)

---

## 📌 TODO (Planned)

- ✅ Swagger/OpenAPI documentation
- ✅ Service-to-service communication (WebClient)
- ✅ Full-featured frontend UI/UX
- ✅  Docker support for all services
- ⏳ User authentication (Spring Security)
- ⏳ Category service (new microservice)
- ⏳ CI/CD deployment

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 📜 Screenshots:

<img width="682" alt="1" src="https://github.com/user-attachments/assets/bca53a10-d5a5-43db-b7e8-5c7bd5f86e15" />
<img width="682" alt="2" src="https://github.com/user-attachments/assets/d7bf79d1-5502-401b-b0fb-30fb0ae6599e" />







