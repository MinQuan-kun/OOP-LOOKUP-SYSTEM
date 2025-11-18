import express from "express";

const router = express.Router();

router.get("/", (req, res) =>
{
    res.status(200).send("ok");
})

router.post("/", (req, res) =>
{
    res.status(200).json({ message: "ok"});
})

router.put("/:id", (req, res) =>
{
    res.status(200).json({ message: "ok"});
})

router.delete("/:id", (req, res) =>
{
    res.status(200).json({ message: "ok"});
})

export default router
