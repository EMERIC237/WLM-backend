const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function reviewsExist(req, res, next) {
  const foundReview = await reviewsService.readReviews(req.params.reviewId);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}

async function destroy(req, res, next) {
  await reviewsService.destroy(req.params.reviewId);
  res.status(204).send("204 No Content");
}

async function update(req, res, next) {
  const updtatedReview = req.body.data;
  await reviewsService.update(updtatedReview, res.locals.review.review_id);
  const review = await reviewsService.readReviews(res.locals.review.review_id);
  const critic = await reviewsService.readCritics(res.locals.review.review_id);
  const newReview = { ...review, critic: critic };
  res.json({ data: newReview });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewsExist), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewsExist), asyncErrorBoundary(update)],
};
