const knex = require("../db/connection");
const tableName = "movies";

//to list
function list(is_showing) {
  if (typeof is_showing === undefined || is_showing !== "true") {
    return knex(tableName).select("movie_id as id","title","");
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
  return knex("critics as c").select("*").where("critic_id", critic_id).first();
}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
  readCritic,
};
