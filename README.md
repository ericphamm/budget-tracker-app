# Budget Tracker App

A full-stack microservices-based budget tracking application built with **Java Spring Boot**, **React**, and **PostgreSQL**.  
This project is designed to demonstrate professional-level software development with a focus on clean architecture, scalable microservices, and modern frontend practices.

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

### 🐳 Docker (Planned)

Both backend and frontend will be dockerized and run using Docker Compose.

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

## 📂 Project Structure

```
budget-tracker-app/
│
├── transaction-service/       → Spring Boot REST API for managing transactions
├── report-service/            → Spring WebFlux service for financial reports
└── frontend/                  → React + Tailwind CSS SPA (Vite)
```

---

## 📦 Tech Stack

| Layer           | Tech                                |
|----------------|--------------------------------------|
| Frontend        | React, Vite, Tailwind CSS            |
| Backend         | Spring Boot, Spring WebFlux          |
| Communication   | REST, WebClient                      |
| Database        | PostgreSQL                           |
| Build Tools     | Maven                                |
| Deployment      | Docker (planned)                     |

---

## 🚀 Setup Instructions

### 🖥️ Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### ☕ Backend - Transaction Service
```bash
cd transaction-service
./mvnw spring-boot:run
```

### ☕ Backend - Report Service (WebFlux)
```bash
cd report-service
./mvnw spring-boot:run
```

Make sure PostgreSQL is running on port `5432`.

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
- ⏳ Docker support for all services
- ⏳ User authentication (Spring Security)
- ⏳ Category service (new microservice)
- ⏳ CI/CD deployment

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 📜 Screenshots:

<img width="682" alt="1" src="https://github.com/user-attachments/assets/bca53a10-d5a5-43db-b7e8-5c7bd5f86e15" />
<img width="682" alt="2" src="https://github.com/user-attachments/assets/d7bf79d1-5502-401b-b0fb-30fb0ae6599e" />







