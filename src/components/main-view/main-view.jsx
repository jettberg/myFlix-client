
import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import './main-view.scss';
import { ProfileView } from "../profile-view/profile-view";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {

    if (!token) {
      return;
    }

    fetch("https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API movies data:", data)
      })
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            _id: doc._id,
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


  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const genreMatch = Array.isArray(movie.genre)
      ? movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
      : movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || genreMatch;
  });

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
        onSearchChange={setSearchQuery}
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
                      <h2>Login!</h2>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                    </Col>
                    <Col md={5}>
                      <h2>Sign up!</h2>
                      <SignupView />
                    </Col>
                  </Row>
                ) : (
                  <>

                    {filteredMovies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <>
                        {filteredMovies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                              movieData={movie}
                              onMovieClick={(newSelectedMovie) => {
                                console.log("Movie clicked in MovieCard:", newSelectedMovie);
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
          path = "/profile"
          element={
            <ProfileView user={user}
            token ={token}
            movies={movies}
            onLogout={handleLogout}/>
          }/>


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
                    <MovieView 
                    movie={selectedMovie}
                    user={user}
                    token={token}
                    setUser={setUser}
                    movies={movies}
                    onMovieSelect={(movie) => setSelectedMovie(movie)}
                    onBackClick={() => setSelectedMovie(null)}/>
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