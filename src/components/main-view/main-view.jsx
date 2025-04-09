import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import './main-view.scss';


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

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>

      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />  

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Row className="signup-login-container justify-content-md-center">
                    <Col md={5} className="mb-4">
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                    </Col>
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  </Row>
                ) : (
                  <>
                    {movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <>
                        {movies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                              movieData={movie}
                              onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                              }}
                            />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            }
          />


          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : !selectedMovie ? (
                  <div>The selected movie doesn't exist!</div>
                ) : (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};