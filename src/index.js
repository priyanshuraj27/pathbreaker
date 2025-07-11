import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db/index.js';
import { app } from './app.js';
dotenv.config({
    path: "./.env"
});
// console.log("Environment variables loaded");

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("MONGO DB connection failed ", error);
    });
