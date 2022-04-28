import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { router } from "./routes/routes";

const app = express();
const port = process.env.PORT;

app.use(router);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
