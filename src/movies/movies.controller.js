const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function moviesExist(req, res, next) {
  const foundMovie = await moviesService.read(req.params.movieId);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

async function list(req, res, next) {
  const is_showing = req.query.is_showing;
  const foundList = await moviesService.list(is_showing);
  console.log(foundList);
  const filteredList = foundList.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  res.json({ data: filteredList });
}

async function read(req, res, next) {
  const { movieId } = req.params;
  res.json({ data: await moviesService.read(movieId) });
}

async function readReviews(req, res, next) {
  const { movieId } = req.params;
  const reviews = await moviesService.readReviews(movieId);

  const newReviews = await Promise.all(
    reviews.map(async (review) => {
      const critic = await moviesService.readCritic(review.critic_id);
      return { ...review, critic: critic };
    })
  );

  res.json({ data: newReviews });
}

async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  res.json({ data: await moviesService.readTheaters(movieId) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(moviesExist), asyncErrorBoundary(read)],
  readReviews: [
    asyncErrorBoundary(moviesExist),
    asyncErrorBoundary(readReviews),
  ],
  readTheaters: [
    asyncErrorBoundary(moviesExist),
    asyncErrorBoundary(readTheaters),
  ],
};
