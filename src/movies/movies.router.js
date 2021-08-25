const router = require("express").Router();
const controller = require("./movies.controller");
const MethodNotAllowed = require("../errors/MethodNotAllowed");

router
  .route("/:movieId/theaters")
  .get(controller.readTheaters)
  .all(MethodNotAllowed);
router
  .route("/:movieId/reviews")
  .get(controller.readReviews)
  .all(MethodNotAllowed);

router.route("/:movieId").get(controller.read).all(MethodNotAllowed);
router.route("/").get(controller.list).all(MethodNotAllowed);

module.exports = router;
