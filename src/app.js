import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb " })); // configure experss app to parse json data

// url encode krta h jaise kabhi kch search krte ho toh space ki jagah %20 aa jata h woh sab samajhne ke liye
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"))  //This setup makes it easier to organize and serve frontend assets directly, without setting up specific routes for each static file.
app.use(cookieParser())


export { app };
