const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// import routes
const userRoutes = require("./routes/userRoutes");

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose connection setup
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.info("Database successfully connected");
  })
  .catch(error => console.error(error));

// routes

app.use("/api/users", userRoutes);

// 404 default route

app.use((req, res) => {
  res.status(404).json({ error: true, message: "Route unavailable" });
});

// export app

module.exports = app;