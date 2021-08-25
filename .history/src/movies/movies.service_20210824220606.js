const knex = require("../db/connection");
const tableName = "movies";

//to destroy.
function list(is_showing) {
  if (typeof is_showing === undefined || is_showing !== "true") {
    return knex(tableName).select("*");
  } else {
    return knex("movies_theaters as mt")
      .join("movies as m", "mt.movie_id", "m.movie_id")
      .where("is_showing", true)
      .select("*");
  }
}

function read(movie_id) {
  return knex(tableName).select("*").where("movie_id", movie_id);
}

function readTheaters(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where("mt.movie_id", movie_id);
}

function readReviews(movie_id) {
  return knex("reviews").select("*").where("movie_id", movie_id);
}

function readCritic(critic_id) {
  return knex("critics as c")
    .where("review_id", review_id)
    .first();
}

function update(updatedReview, review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ review_id })
    .update({
      score: updatedReview.score,
      content: updatedReview.content,
    });
}

module.exports = {
  destroy,
  readReviews,
  readCritics,
  update,
};
