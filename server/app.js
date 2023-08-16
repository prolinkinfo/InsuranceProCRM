import express from "express";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connectdb";

import cors from "cors";


//Setup Express App
const app = express();

// Set up CORS
app.use(cors());

//Set Midleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load Routes
app.use("/", serverRoutes);

import bodyParser from "body-parser";
import serverRoutes from "./routes/serverRoutes";

// Get port from environment and store in Express.
const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`Server listining at http://localhost:${port}`);
});


//Database Connection
const DATABASE_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
connectDB(DATABASE_URL, DB_NAME);
