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

app.use(express.json({ limit: "10mb" })); // configure experss app to parse json data
// url encode krta h jaise kabhi kch search krte ho toh space ki jagah %20 aa jata h woh sab samajhne ke liye
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public")); //This setup makes it easier to organize and serve frontend assets directly, without setting up specific routes for each static file.
app.use(cookieParser());

//ROUTES import

import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import videoRouter from "./routes/video.routes.js";

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter); // done
app.use("/api/v1/users", userRouter); // http://localhost:8000/api/v1/users/register
app.use("/api/v1/tweets", tweetRouter); // done
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/videos", videoRouter); // done
app.use("/api/v1/comments", commentRouter); // done
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/dashboard", dashboardRouter);

export { app };
