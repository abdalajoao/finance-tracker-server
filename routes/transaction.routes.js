import express from "express";
import isAuthenticated from "../middleware/jwt.middleware.js";
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controllers/transactions.controller.js";

const router = express.Router();

//Create Transaction
router.post("/", isAuthenticated, createTransaction);

//Get Transactions
router.get("/", isAuthenticated, getTransactions);

//Update Transaction
router.put("/:transactionId", isAuthenticated, updateTransaction);

//Delete Transaction
router.delete("/:transactionId", isAuthenticated, deleteTransaction);

export default router;