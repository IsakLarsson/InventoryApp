import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import config from "./config/config";
import { errorHandling } from "./middleware/errorMiddleware";
import characterRoutes from "./routes/characterRoutes";
import itemRoutes from "./routes/itemRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(function (req, res, next) {
    console.log("Request recieved");
    next();
});

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("ERROR", error.message);
    });

app.use(express.json());
app.use(itemRoutes);
app.use(characterRoutes);
app.use(userRoutes);
app.use(errorHandling);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
