// =============================================
//  Todo Routes - All CRUD operations live here
//  GET, POST, PUT, DELETE for /todos
// =============================================

const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Path to our JSON file that acts as a simple "database"
const dataFilePath = path.join(__dirname, "../data/todos.json");

// ---- Helper: Read todos from the JSON file ----
function readTodos() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

// ---- Helper: Write todos back to the JSON file ----
function writeTodos(todos) {
  fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2));
}

// =============================================
//  GET /todos → Fetch all todos
// =============================================
router.get("/", (req, res) => {
  try {
    const todos = readTodos();
    res.json({
      success: true,
      count: todos.length,
      todos: todos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error reading todos" });
  }
});

// =============================================
//  POST /todos → Add a new todo
// =============================================
router.post("/", (req, res) => {
  try {
    const { title } = req.body;

    // Simple validation - title is required
    if (!title || title.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const todos = readTodos();

    // Create a new todo object
    const newTodo = {
      id: Date.now(), // Using timestamp as a simple unique ID
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json({
      success: true,
      message: "Todo added successfully!",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding todo" });
  }
});

// =============================================
//  PUT /todos/:id → Update a todo (mark complete or change title)
// =============================================
router.put("/:id", (req, res) => {
  try {
    const todoId = parseInt(req.params.id); // Get ID from URL
    const { title, completed } = req.body;

    let todos = readTodos();

    // Find the index of the todo we want to update
    const index = todos.findIndex((todo) => todo.id === todoId);

    // If not found, send a 404 error
    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    // Update only the fields that were sent in the request
    if (title !== undefined) todos[index].title = title.trim();
    if (completed !== undefined) todos[index].completed = completed;

    writeTodos(todos);

    res.json({
      success: true,
      message: "Todo updated successfully!",
      todo: todos[index],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating todo" });
  }
});

// =============================================
//  DELETE /todos/:id → Delete a todo by ID
// =============================================
router.delete("/:id", (req, res) => {
  try {
    const todoId = parseInt(req.params.id); // Get ID from URL

    let todos = readTodos();

    // Check if the todo actually exists
    const exists = todos.find((todo) => todo.id === todoId);
    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    // Filter out the todo with the matching ID
    todos = todos.filter((todo) => todo.id !== todoId);
    writeTodos(todos);

    res.json({
      success: true,
      message: "Todo deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting todo" });
  }
});

module.exports = router;
