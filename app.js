import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import connectionDB from "./db/mongoose.connection.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));






app.get("/",  (req, res) => {
    res.send("Finance Tracker API is running");
});


app.use("/auth", authRoutes);

await connectionDB();;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
