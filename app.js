const express = require("express");
const userRouter = require("./routes/userRoutes");
const mongoSanitize = require("express-mongo-sanitize");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(mongoSanitize());

app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

module.exports = app;
