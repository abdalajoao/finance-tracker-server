import express from "express";
import isAuthenticated from "../middleware/jwt.middleware.js";
import {
  createCategory,
  getCategories,
} from "../controllers/category.controller.js";


const router = express.Router();

// Create a new category
router.post("/", isAuthenticated, createCategory);

// Get all categories
router.get("/", isAuthenticated, getCategories);

export default router;