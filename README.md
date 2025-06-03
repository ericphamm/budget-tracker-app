# 💰 Budget Tracker (Full-Stack App with Microservices)

This is a full-stack personal finance app that helps users track income, expenses, and view financial summaries — built with **React (Vite + Tailwind)** for the frontend and **Spring Boot (Java)** microservices for the backend. Data is stored in **PostgreSQL**, and the services communicate via **REST (WebClient)**.

---

## ✨ Features

### ✅ Frontend (React + Tailwind)
- Responsive design and clean UI
- Add, delete, and filter transactions by:
  - Search keyword
  - Min/max amount
  - Transaction type (income / expense)
- View:
  - Total income / expense / balance (fetched from backend)
- Interactive form with two toggle buttons for transaction type
- Pagination support
- Nice icons and layout using `lucide-react`

### 🧩 Backend (Spring Boot Microservices)

#### `transaction-service`
- REST API to manage transactions
- Filtering and pagination
- Validation and error handling
- Connects to PostgreSQL
- Exposes data for other services

#### `report-service`
- Aggregates total income, expenses, and balance
- Communicates with `transaction-service` using **Spring WebClient**
- Exposes `/report/income`, `/report/expense`, and `/report/balance`

---

## ⚙️ Tech Stack

| Layer       | Technology                 |
|-------------|----------------------------|
| Frontend    | React, Vite, Tailwind CSS  |
| Backend     | Spring Boot (Java 17+)     |
| DB          | PostgreSQL                 |
| Communication | REST, WebClient (Reactive) |
| Tools       | IntelliJ, Postman, VS Code |
| API Format  | JSON                       |

---

## 🧪 How to Run the Project

### Backend

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/budget-tracker-microservices.git
   cd budget-tracker-microservices
   ```

2. Start PostgreSQL and update `application.properties` (or use default values).

3. Run each service:
   ```bash
   cd transaction-service
   ./mvnw spring-boot:run

   cd ../report-service
   ./mvnw spring-boot:run
   ```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:5173`  
API runs at: `http://localhost:8080` and `http://localhost:8081`

---

## 📦 Project Structure

```
budget-tracker-microservices/
│
├── transaction-service/      # Handles transaction data
├── report-service/           # Aggregates totals using WebClient
├── frontend/                 # React + Tailwind frontend
│
└── README.md
```

---

## 🔒 Next Features (Planned)

- Docker Compose for containerized setup
- Swagger/OpenAPI for API documentation
- Add `category-service` to allow assigning categories per transaction
- Basic unit + integration tests
- Optional: user authentication

---

## 📸 Screenshots

*Include screenshots of the app UI*

---

## 👨‍💻 Author

- 👤 **Eric Pham (Pham Quang Thang)**
- 🌐 https://www.linkedin.com/in/ericthangpham

---

## 📝 License

This project is licensed under the MIT License.
