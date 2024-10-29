import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at  port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION FAILED !!!", err);
  });


/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR:",error);
      throw error;
    });
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening on PORT ${process.env.PORT}`);
    })
  } catch (error) {
    console.log("ERROR:", error);
    throw err;
  }
})();
*/
