import express from "express";
const router = express.Router();

router.get("/api/hello", (req, res) => {
    res.json({ hello: "hello" });
});

export const hello = (): void => {
    console.log("hello");
};

export default router;
