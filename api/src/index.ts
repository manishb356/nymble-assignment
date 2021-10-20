import express from "express";
import { genres, movies } from "./db";
import { Movie } from "./types";
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8080"],
  })
);

/**
 * Return movies that match the 'search term' with movie 'title'.
 * If search term is not provided, return all movies.
 */
app.get("/movies", (req, resp) => {
  // req.params.search
  resp.send(movies);
});

/**
 * Return all genres.
 */
app.get("/genres", (req, resp) => {
  resp.send(genres);
});

/**
 * Return movies that match the provided ID.
 */
app.get("/movies/:id", (req, resp) => {
  const id = Number(req.params.id);
  // TODO Return the movie
  let result = movies.find((movie) => movie.id === id);
  if (!result) resp.send({ message: "No Movie found with that id" });
  else resp.send(result);
});

/**
 * Return genre that match the provided ID.
 */
app.get("/genres/:id", (req, resp) => {
  const id = Number(req.params.id);
  // TODO Return the genre
  let result = genres.find((genre) => genre.id === id);
  if (!result) resp.send({ message: "No genre found with that id" });
  else resp.send(result);
});

/**
 * Add rating to a movie.
 * For simplicity of the task, the array acts as a DB in runtime.
 */
app.post("/movies/:id/ratings", (req, resp) => {
  // TODO
  const id = Number(req.params.id);
  let rating = Number(req.body.ratingVal);

  if (rating > 10) {
    resp.send({ message: "Rating should be less than 10" });
  } else {
    let index = movies.findIndex((movie) => movie.id === id);
    let current_rating = movies[index].vote_average,
      current_count = movies[index].vote_count;
    current_rating += rating / (current_count + 1);
    current_count++;

    movies[index].vote_average = current_rating;
    movies[index].vote_count = current_count;

    resp.send(movies[index]);
  }
});

/**
 * Searching for all movies
 */
app.get("/search", (req, resp) => {
  // req.params.search
  resp.send(movies);
});

/**
 * Search for a movie
 */
app.get("/search/:name", (req, resp) => {
  const name = String(req.params.name);
  console.log(name);
  let result: Movie[] = [];
  movies.forEach((movie) => {
    if (movie.title.toLowerCase().includes(name.toLowerCase())) {
      result.push(movie);
    }
  });
  resp.send(result);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
