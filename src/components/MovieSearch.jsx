import { useState } from "react";
import axios from "axios";
import Flag from "./ReactFlagsSelect";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const searchMovies = () => {
    if (query === "") return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=863384a4d6f985089d6d7b21160a7268&query=${query}`;

    axios
      .get(url)
      .then((resp) => {
        setMovies(resp.data.results);
      });
  }

  const searchSeries = () => {
    if (query === "") return;

    const url = `https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=${query}`;

    axios
      .get(url)
      .then((resp) => {
        setSeries(resp.data.results);
      });
  }

  return (
    <div className="container">
      <h1>Cerca un Film o una serie tv</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Scrivi il nome del film o della serie TV che stai cercando..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-danger" onClick={() => {
          searchMovies();
          searchSeries();
        }}>
          Cerca
        </button>

      </div>
      <h2>Film</h2>
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
              <p className="card-text"><strong>Lingua:</strong> <Flag lang={movie.original_language} /></p>
              <p className="card-text"><strong>Voto:</strong> {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Serie</h2>
      <div className="d-flex flex-wrap justify-content-between">
        {series.map((tv) => (
          <div key={tv.id} className="card mb-4">
            <img
              className="card-img-top"
              alt={tv.original_name}
            />
            <div className="card-body">
              <h3 className="card-title">{tv.name}</h3>
              <p className="card-text"><strong>Titolo originale:</strong> {tv.original_name}</p>
              <p className="card-text"><strong>Lingua:</strong> <Flag lang={tv.original_language} /></p>
              <p className="card-text"><strong>Voto:</strong> {tv.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
