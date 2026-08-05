import express from "express";
import isAuthenticated from "../middleware/jwt.middleware.js";
import { createTransaction } from "../controllers/transactions.controller.js";

const router = express.Router();

//Create Transaction
router.post("/", isAuthenticated, createTransaction);

export default router;