import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import AuthRouter from "./routes/Authroute.js"
import userRouter from "./routes/userroute.js"
import PostRouter from "./routes/Postroute.js"
import cors from "cors"
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use(cors()) // Use this after the variable declaration
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT, () => console.log("listening")))
  .catch((error) => console.log(error));


  app.use('/auth', AuthRouter);
  app.use('/user', userRouter);
  app.use('/post',PostRouter);