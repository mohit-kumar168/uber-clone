import express from "express";
import cors from "cors";
import { router as userRouter } from "./routes/user.routes.js";
import { router as captainRouter } from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/captains", captainRouter);

export { app };
