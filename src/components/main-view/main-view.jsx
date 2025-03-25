import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { movieView } from "../movie-view/movie-view";


// The following is the old code that is used prior to the "useState" state from react
// export const MainView = () => {
//     return (
//       <div>
//         <div>Eloquent Javascript</div>
//         <div>Mastering Javascript Functional Programming</div>
//         <div>Javascript: The Good Parts</div>
//         <div>Javascript: the Definitive Guide</div>
//         <div>The Road to React</div>
//       </div>
//     );
//   };






// the following is the updated code that uses the "useState" prop


export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1, title: "Eloquent Java",
      image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      author: "Jett berg 1"
    },


    {
      id: 2, title: "Ugly Java",
      image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      author: "Jett berg 2"
    },


    {
      id: 3, title: "Decent Java",
      image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      author: "Jett berg 3"
    },


    {
      id: 4, title: "Whatever Java",
      image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      author: "Jett berg 4"
    },


    {
      id: 5, title: "Astounding Java",
      image: "https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg",
      author: "Jett berg 5"
    }
  ]);




  const [selectedMovie, setSelectedMovie] = useState(null);
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackCLick={() => setSelectedMovie(null)} />
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

