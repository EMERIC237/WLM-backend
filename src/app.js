if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//require routers
const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theaterRouter = require('./theaters/theaters.router');

app.use(cors());
app.use(express.json());

//use routers
app.use("/movies",moviesRouter);
app.use("/reviews",reviewsRouter);
app.use("/theaters",theaterRouter);

//NOT found handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: `page not found: ${req.originalUrl}`,
  });
});

//errors handler
app.use((err, req, res, next) => {
  const { status = 500, message = "something went wrong" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
