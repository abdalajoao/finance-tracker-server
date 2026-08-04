import express from "express";
import isAuthenticated from "../middleware/jwt.middleware.js";
import {createCategory} from "../controllers/creategory.Controller.js";


const router = express.Router();

router.post("/", isAuthenticated, createCategory);

export default router;