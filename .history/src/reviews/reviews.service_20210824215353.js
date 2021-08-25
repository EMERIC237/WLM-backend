const knex = require("../db/connection");
const tableName = "reviews";

//to destroy.
function destroy(review_id) {
  return knex(tableName).where({ review_id }).del();
}

function readReviews(review_id) {

  return knex("reviews as r").
    .join("critics as c", "r.critic_id", "c.critic_id")
    select("r.*")
    .where("review_id", review_id)
    .first();
}

function readCritics(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("c.*")
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
