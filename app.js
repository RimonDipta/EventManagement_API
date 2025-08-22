const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");
const dotENV = require("dotenv");

const router = require("./src/routes/api");

dotENV.config();

const app = express();

let limiter = rateLimit({ windowMs: 15 * 60 * 1000 });

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(limiter);

mongoose
  .connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

//api end point tag
app.use("/api/v1", router);

module.exports = app;
