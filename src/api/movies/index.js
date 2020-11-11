const express = require("express");
const router = express.Router();
const {
  getMovies,
  addMovie,
  getLikeMovies,
  deleteMovie,
  setLike
} = require("./services");

router.put('/likes/:id', ({params}, res) => {
  res.json(setLike(params.id));
});

router.delete('/delete/:id', ({params}, res) => {
  res.json(deleteMovie(params.id));
});

router.get('/likes', ({params}, res) => {
  res.json(getLikeMovies());
});

router.post('/', ({body}, res) => {
  res.json(addMovie());
});

router.get('/', (req, res) => {
  res.json(getMovies());
});

module.exports = router;
