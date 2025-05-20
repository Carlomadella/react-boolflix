import { useState } from "react";
import axios from "axios";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  function searchMovies() {
    if (query === "") return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=863384a4d6f985089d6d7b21160a7268&query=${query}`;

    axios
      .get(url)
      .then((resp) => {
        setMovies(resp.data.results);
      });
  }

  return (
    <div className="container">
      <h1>Cerca un Film</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Scrivi il nome del film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={searchMovies}>
          Cerca
        </button>
      </div>

      <div className="d-flex flex-wrap justify-content-between">
        {movies.map((movie) => (
          <div key={movie.id} className="card mb-4">
            <img
              className="card-img-top"
              alt={movie.title}
            />
            <div className="card-body">
              <h3 className="card-title">{movie.title}</h3>
              <p className="card-text"><strong>Titolo originale:</strong> {movie.original_title}</p>
              <p className="card-text"><strong>Lingua:</strong> {movie.original_language}</p>
              <p className="card-text"><strong>Voto:</strong> {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
