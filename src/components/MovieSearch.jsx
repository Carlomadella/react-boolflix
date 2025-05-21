import { useState } from "react";
import axios from "axios";
import Flag from "./ReactFlagsSelect";
import Header from "./Header";

function getStars(vote) {
  let fullStars = 0;

  if (vote <= 2) {
    fullStars = 1;
  } else if (vote <= 4) {
    fullStars = 2;
  } else if (vote <= 6) {
    fullStars = 3;
  } else if (vote <= 8) {
    fullStars = 4;
  } else {
    fullStars = 5;
  }

  const emptyStars = 5 - fullStars;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={"full-" + i} className="fa-solid fa-star text-warning me-1"></i>);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={"empty-" + i} className="fa-regular fa-star text-muted me-1"></i>);
  }

  return <>{stars}</>;
}

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  function searchAll() {
    if (query === "") return;

    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=863384a4d6f985089d6d7b21160a7268&query=${query}`;
    const seriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=${query}`;

    axios.get(movieUrl).then((resp) => {
      setMovies(resp.data.results);
    });

    axios.get(seriesUrl).then((resp) => {
      setSeries(resp.data.results);
    });
  }

  return (
    <div>
      <Header query={query} setQuery={setQuery} onSearch={searchAll} />

      <div className="container mt-4">
        <h2>Film</h2>
        <div className="d-flex flex-wrap gap-3 justify-content-between">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div
                className="movie-bg"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})`,
                }}
              >
                <div className="movie-overlay p-3">
                  <p><strong>Titolo:</strong> {movie.title}</p>
                  <p><strong>Titolo originale:</strong> {movie.original_title}</p>
                  <p><strong>Lingua:</strong> <Flag lang={movie.original_language} /></p>
                  <p><strong>Voto:</strong> {getStars(movie.vote_average)}</p>
                  <p><strong>Overview:</strong> {movie.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-5">Serie TV</h2>
        <div className="d-flex flex-wrap gap-3 justify-content-between">
          {series.map((tv) => (
            <div key={tv.id} className="movie-card">
              <div
                className="movie-bg"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w342${tv.poster_path})`,
                }}
              >
                <div className="movie-overlay p-3">
                  <p><strong>Titolo:</strong> {tv.name}</p>
                  <p><strong>Titolo originale:</strong> {tv.original_name}</p>
                  <p><strong>Lingua:</strong> <Flag lang={tv.original_language} /></p>
                  <p><strong>Voto:</strong> {getStars(tv.vote_average)}</p>
                  <p><strong>Overview:</strong> {tv.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieSearch;
