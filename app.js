const express = require("express");
const userRouter = require("./routes/userRoutes");
const mongoSanitize = require("express-mongo-sanitize");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use(mongoSanitize());

app.use("/api/v1/users", userRouter);

app.use(globalErrorHandler);

module.exports = app;
