import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import config from "./config/config";
import { router } from "./routes/routes";

dotenv.config();
const app = express();
const port = process.env.PORT;

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.error("ERROR", error.message);
    });

app.use(express.json());
app.use(router);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
