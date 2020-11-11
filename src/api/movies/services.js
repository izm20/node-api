const fs = require('fs');
const DB_PATH = 'src/api/db/database.json';
let movies;

const loadDB = () => {
  console.log('Leyendo de la basae de datos');
  return new Promise((resolve, reject) => {
    fs.readFile(DB_PATH, (err, data) => {
      if (err) {
        reject('Hubo un error en la lectura del fichero');
      } else {
        movies = JSON.parse(data.toString());
      }
    });
    resolve();
  });
};

const saveDB = () => {
  fs.writeFileSync(DB_PATH, JSON.stringify(movies, null, 2), 'utf8');
};

const buildID = () => {
  let id = 1;
  if (movies.length > 0) {
    id = movies[movies.length - 1].id + 1;
  }
  return id;
};

const buildMovie = (id, body, likes = 0) => ({
  id: id,
  ...body,
  likes: likes
});

const findMovieIndexById = (id) => movies.findIndex(movie => movie.id == id);

const getMovies = () => movies;

const getLikeMovies = () => movies.filter(movie => movie.likes == 1);

const checkMovie = (body) => {
  if (movies.find(movie => movie.name == body.name)) {
    return false;
  }
  return true;
};

const addMovie = (body) => {
  if (!checkMovie(body)) {
    return 'This movie is already in the db';
  } else {
    const newMovie = buildMovie(buildID(), body, 0);
    movies.push(newMovie);
    saveDB();
    return newMovie;
  }
};

const deleteMovie = (id) => {
  const movieIndex = findMovieIndexById(id);
  movies.splice(movieIndex, 1);
  saveDB();
  return movies;
};


const setLike = (id) => {
  const movieIndex = findMovieIndexById(id);
  movies[movieIndex].likes = 1;
  saveDB();
  return movies[movieIndex];
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
  getLikeMovies,
  setLike,
  loadDB
};
