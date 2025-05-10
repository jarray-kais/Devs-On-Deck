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

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbconnect();

app.use(normalizeErrors);
app.use(notFoundHandler);
app.use(globalErrorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening on port : ${PORT}`));
