import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser:null);
  const [token, setToken] = useState(storedToken? storedToken:null);


  useEffect(() => {

    if (!token) {
      return;
    }

    fetch("https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}` },
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
          rating: doc.rating,
        };
      });
      setMovies(moviesFromApi);
    });
  }, [token]);

  if (!user) {
    return (
    <>
    <LoginView onLoggedIn= {(user, token) => {
      setUser(user);
      setToken(token);
    }} />
    or
    <SignupView />
    </>
    );
  };

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }



  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {


    return (
      <div>
        {movies.map((movie) => {
          return <MovieCard 
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} />
        })}
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      </div>
    );
  }


};

