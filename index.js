// =============================================
//  Simple Todo API - Built with Node.js + Express
//  Author: Student Project
//  Port: 3000
// =============================================

const express = require("express");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = 3000;

// ---- Middleware ----
// This allows us to read JSON data sent in request body
app.use(express.json());

// Serve our HTML frontend from the 'public' folder
app.use(express.static("public"));

// Allow browser fetch() to talk to our API (CORS fix)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ---- Routes ----
// All todo-related routes are handled in routes/todos.js
app.use("/todos", todoRoutes);

// ---- Root Route ----
// The HTML file in /public/index.html is automatically served at '/'

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
