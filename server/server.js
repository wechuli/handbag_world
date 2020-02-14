const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

// port
const PORT = process.env.PORT || 3002;

// listen
app.listen(PORT, () => {
  console.info(`Server running at ${PORT}`);
  console.log(process.env.JWT_SECRET);
});
