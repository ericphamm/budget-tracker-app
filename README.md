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

### ✅ Backend (Spring Boot - Microservices)
**Transaction Service**
- Create, update, delete, and filter transactions
- Paginated endpoints
- Custom queries and validation

**Report Service**
- Built with WebFlux
- Calls transaction-service using WebClient (service-to-service communication)
- Computes total income, expenses, and balance reactively

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
