import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../movie-view/movie-view";




export const MainView = () => {
  // const [movies, setMovies] = useState([
  //   {
  //     id: 1, title: "Eloquent Java",
  //     image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
  //     author: "Jett berg 1"
  //   },


  //   {
  //     id: 2, title: "Ugly Java",
  //     image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
  //     author: "Jett berg 2"
  //   },


  //   {
  //     id: 3, title: "Decent Java",
  //     image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
  //     author: "Jett berg 3"
  //   },


  //   {
  //     id: 4, title: "Whatever Java",
  //     image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
  //     author: "Jett berg 4"
  //   },


  //   {
  //     id: 5, title: "Astounding Java",
  //     image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
  //     author: "Jett berg 5"
  //   }
  // ]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((doc) => {
        return {
          id: doc._id,
          title: doc.title,
          year: doc.year,
          genre: doc.genre.join(', '),
          director: doc.director,
          cast: doc.cast.join(', '),
          runtime: doc.runtime,
          rating: doc.rating,
        };
      });
      setMovies(moviesFromApi);
    });
  }, []);



  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }




  if (movies.length === 0) {
    return <div>The listy is empty!</div>;
  } else {


    return (
      <div>
        {movies.map((movie) => {
          return <MovieCard key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} />
        })}
      </div>
    );
  }


  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id}
          movie={movie}
          onCLick={() => {
            setSelectedMovie(movie);
          }} />
      ))}
    </div>
  );


};

