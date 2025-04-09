import "./movie-view.scss";
import { Link, useParams } from "react-router";

export const MovieView = ({ movie }) => {

    // const { movieId } = useParams();
    // const movie = movies.find((m) => m.id === movieId);
        if (!movie) return <div>Movie not found</div>;

    return (
        <div className="movie-view">
            <h1>{movie.title}</h1>

            {movie.image && (
                <div>
                    <img src={movie.image} 
                    alt={movie.title} 
                    className="w-100"/>
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
            <Link to={'/'}>
            <button className="back-button" 
            style={{ cursor: "pointer"}}>Back
            </button>
            </Link>
        </div>
    );
};