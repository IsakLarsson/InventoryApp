import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { hello } from "./routes";
import routes from "./routes";

const app = express();
const port = process.env.PORT;

app.use(routes);

app.get("/", (req, res) => {
    res.send({ dude: "hellossd" });
    hello();
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
