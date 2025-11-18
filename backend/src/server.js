import express from "express";
import LessionRoute from "./routes/LessionRouter.js";


const app = express();

app.use("/api/lession", LessionRoute)

app.listen(5001, () =>
{
    console.log("server dang chay");
})