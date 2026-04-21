# 📝 Todo API — Node.js + Express

A simple beginner-friendly **Todo REST API** built with **Node.js** and **Express**.  
Data is stored in a local JSON file — no database needed!

---

## 📁 Project Structure

```
Todo-With-node/
│
├── index.js          ← Main server file (entry point)
├── package.json      ← Project info and dependencies
│
├── routes/
│   └── todos.js      ← All todo API routes (GET, POST, PUT, DELETE)
│
└── data/
    └── todos.json    ← Our simple "database" (JSON file)
```

---

## 🚀 How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
node index.js
```

The server will start at → **http://localhost:3000**

---

## 🔗 API Endpoints

| Method | Endpoint        | Description         |
|--------|-----------------|---------------------|
| GET    | `/todos`        | Get all todos       |
| POST   | `/todos`        | Add a new todo      |
| PUT    | `/todos/:id`    | Update a todo       |
| DELETE | `/todos/:id`    | Delete a todo       |

---

## 📬 Example Requests (using curl or Postman)

### ➕ Add a Todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

### 📋 Get All Todos
```bash
curl http://localhost:3000/todos
```

### ✏️ Update a Todo
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### 🗑️ Delete a Todo
```bash
curl -X DELETE http://localhost:3000/todos/1
```

---

## 🛠️ Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework for Node
- **fs module** — Built-in Node module to read/write JSON file

---

## 💡 Notes

- No MongoDB or any external database is used.
- Todos are saved in `data/todos.json` — simple and readable!
- IDs are generated using `Date.now()` (timestamp-based).
