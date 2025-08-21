import dotenv from "dotenv";
dotenv.config()


import express from "express";
import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/auth.route.js";

const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running !!!")
})

app.use("/auth", authRouter);


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Mongodb connection failed", error)
    })