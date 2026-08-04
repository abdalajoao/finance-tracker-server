import express from "express";
import isAuthenticated from "../middleware/jwt.middleware.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";


const router = express.Router();

// Create a new category
router.post("/", isAuthenticated, createCategory);

// Get all categories
router.get("/", isAuthenticated, getCategories);

// Update a category
router.put("/:categoryId", isAuthenticated, updateCategory);

// Delete a category
router.delete("/:categoryId", isAuthenticated, deleteCategory);

export default router;