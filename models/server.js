import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
// public image
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));
// middle ware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleWare.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import { contextsKey } from "express-validator/lib/base.js";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.get("/api/v1/test", (req, res) => {
  res.json("hello Cores");
});

// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test rout" });
// });

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

// Not found midleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5100;

// mongoose
try {
  await mongoose.connect(process.env.MONGO_URL);
  // port listen
  app.listen(port, () => {
    console.log(`server runing on port ${port} ....`);
  });
} catch (error) {
  console.log(error);
  process.exit;
}
