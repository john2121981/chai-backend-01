import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//check cors documentation for whitelists
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); //to avoid crashing the site due to excess json files
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //read documentation
app.use(express.static("public"));
app.use(cookieParser());

export default app;
