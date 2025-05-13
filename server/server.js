import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dbconnect from "./config/mongoose.config.js";
import {
    globalErrorHandler,
    normalizeErrors,
    notFoundHandler,
} from "./util/ErrorExtractor.js";
import userRouter from "./routes/user.routes.js";
import organizationRouter from "./routes/organization.route.js";
import positionRouter from "./routes/Position.route.js";
import applicationRouter from "./routes/Application.routes.js";
dotenv.config();
const app = express();
dbconnect();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


app.use("/api/users", userRouter);
app.use("/api/organizations", organizationRouter);
app.use("/api/positions", positionRouter);
app.use("/api/applications", applicationRouter);

app.use(normalizeErrors);
app.use(notFoundHandler);
app.use(globalErrorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening on port : ${PORT}`));
