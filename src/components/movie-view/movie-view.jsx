import "./movie-view.scss";
import { Link, useParams } from "react-router";
import { Button } from 'react-bootstrap';

export const MovieView = ({ movie, user, token, setUser }) => {
    console.log("MovieView revieved movie", movie);
    // const { movieId } = useParams();
    // const movie = movies.find((m) => m.id === movieId);
    if (!movie) return <div>Movie not found</div>;
        
    const isFavorite = user.FavoriteMovies.includes(movie.id);
        console.log("movie.id being used in FavoriteToggle:", movie?.id);
        
    const handleFavoriteToggle = (movieId) => {

        const url = `https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/users/${user.Username}/movies/${movieId}`;
        const method = isFavorite ? 'DELETE' : 'POST';
    
        fetch(url, {
          method: method,
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` }
        })
          .then((response) => {
            if (response.ok) {
              const updatedFavorites = isFavorite
                ? user.FavoriteMovies.filter((id) => id !== movieId)
                : [...user.FavoriteMovies, movieId];
    
              const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
    
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setUser(updatedUser);
            } else {
              throw new Error('Favorite toggle failed');
            }
          })
          .catch((error) => console.error(error));
      };

    return (
        <div className="movie-view">
            <h1>{movie.title}</h1>

            {movie.image && (
                <div>
                    <img src={movie.image}
                        alt={movie.title}
                        className="w-100" />
                </div>
            )}

            <div>
                <strong>Genre:</strong> {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
            </div>
            <div>
                <strong>Director:</strong> {movie.director}
            </div>
            <div>
                <strong>Cast:</strong> {Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast}
            </div>
            <div>
                <strong>Rating:</strong> {movie.rating}
            </div>

            <Button
                onClick={() => handleFavoriteToggle(movie.id)}
                variant={isFavorite ? 'danger' : 'primary'}
            >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>

            <Link to={'/'}>
                <button className="back-button"
                    style={{ cursor: "pointer" }}>Back
                </button>
            </Link>
        </div>
    );
};