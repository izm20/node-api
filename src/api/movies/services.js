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
  // TODO
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

const getMovies = () => movies;

const addMovie = (body) => {
  const newMovie = buildMovie(buildID(), body, 0);
  movies.push(newMovie);
  return newMovie;
}

const deleteMovie = (id) => {
  const movieIndex = movies.findIndex(movie => movie.id == id);
  movies.splice(movieIndex, 1);
  return movies;
}

const getLikeMovies = () => movies.filter(movie => movie.likes == 1);

const setLike = (id) => {
  const movieIndex = findMovieById(id);
  movies[movieIndex].likes = 1;
  return movies[movieIndex];
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  getLikeMovies,
  setLike
}
