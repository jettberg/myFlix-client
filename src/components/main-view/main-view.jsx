import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);


  useEffect(() => {

    if (!token) {
      return;
    }

    fetch("https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            year: doc.year,
            genre: doc.genre,
            director: doc.director,
            cast: doc.cast,
            runtime: doc.runtime,
            image: doc.image,
            rating: doc.rating,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">

      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <p>or</p>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-3" key={movie.id} md={6}>
              <MovieCard
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
            style={{ cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      )}
    </Row>
  );
};