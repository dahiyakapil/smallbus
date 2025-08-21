import dotenv from "dotenv";
dotenv.config()


import express from "express";
import { connectDB } from "./config/connectDB.js";

const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running !!!")
})


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Mongodb connection failed", error)
    })