# Budget Tracker App

A full-stack **Budget Tracker** web application built with **Java (Spring Boot)** and **React**.  
This project allows users to manage income and expenses, visualize totals, and filter transactions.

---

## 🛠 Technologies Used

### Backend:
- Java 17+
- Spring Boot
- Spring Data JPA (Hibernate)
- PostgreSQL
- REST API
- WebClient (service-to-service communication)
- Maven
- Docker (optional)
- Swagger/OpenAPI (planned)
- JUnit (planned)

### Frontend:
- React (Vite)
- Tailwind CSS
- Lucide React icons
- Fetch API

---

## 🧱 Architecture

- **Monorepo-style microservices**:
  - `transaction-service`: Handles income/expense transaction data
  - `report-service`: Fetches income, expense, and balance totals from transaction-service using WebClient

- Frontend (`vite + react`) runs separately and connects via REST.

---

## ✨ Features

- Add, delete, and filter transactions
- View total income, expense, and balance
- Pagination and search
- Type-based filters (income, expense)
- Clean UI with Tailwind
- Microservice architecture (transaction-service, report-service)
- Service-to-service communication using WebClient

---

## 📸 Screenshots

_coming soon..._

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js + npm
- PostgreSQL
- Maven

---

### Backend

1. **Clone the repo**:

```bash
git clone https://github.com/ericphamm/budget-tracker-app.git
cd budget-tracker-app
```

2. **Set up PostgreSQL**:

- Create a database called `budget_db`
- Configure DB credentials in `application.properties`

3. **Run the services**:

```bash
cd transaction-service
./mvnw spring-boot:run

cd ../report-service
./mvnw spring-boot:run
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app should now run at: `http://localhost:5173`

---

## 🧪 Coming Soon

- Swagger UI for API docs (`/swagger-ui.html`)
- JUnit tests
- Docker containers for each service
- Centralized configuration
- Auth & security (optional)

---

## 📂 Repository Structure

```
budget-tracker-app/
├── transaction-service/
├── report-service/
├── frontend/ (React)
└── README.md
```

---

## 👨‍💻 Author

**Eric Pham (Phạm Quang Thắng)**

- GitHub: [@ericphamm](https://github.com/ericphamm)
- LinkedIn: [Eric Thang Pham](https://www.linkedin.com/in/ericthangpham)

---

## ⭐️ Support & Contribution

If you find this useful, feel free to star the repo or reach out for improvements!