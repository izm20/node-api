const express = require("express");
const router = express.Router();
const fs = require("fs");
let movies;

const loadDB = () => {
  console.log("Leyendo de la basae de datos")
  return new Promise((resolve, reject) => {
    fs.readFile("src/api/db/database.json", (err, data) => {
      if (err) {
        reject("Hubo un error en la lectura del fichero");
      } else {
        movies = JSON.parse(data.toString())
      }
    })
    resolve();
  })
};

const saveDB = () => {

}

loadDB();

const buildID = () => {
  let id = 1
  if (movies.length > 0) {
    id = movies[movies.length - 1].id + 1
  }
  return id
};

const buildMovie = (id, body, likes = 0) => ({
  id: id,
  ...body,
  likes: likes
});

const findMovieById = (id) => movies.findIndex(movie => movie.id == id);

router.post('/', ({body}, res) => {
  const newMovie = buildMovie(buildID, body, 0);
  movies.push(newMovie);
  res.json(newMovie);
});

router.get('/', (req, res) => {
  res.json(movies);
});

router.put('/likes/:id', ({params}, res) => {
  const movieIndex = findMovieById(params.id);
  movies[movieIndex].likes = 1
  res.json(movies[movieIndex]);
});

router.delete('/delete/:id', ({params}, res) => {
  const id = Number(params.id);
  const movieIndex = movies.findIndex(movie => movie.id === id);
  res.json(movies.splice(movieIndex, 1));
});

router.get('/likes', ({params}, res) => {
  res.json(movies.filter(movie => movie.likes == 1));
});

module.exports = router;
