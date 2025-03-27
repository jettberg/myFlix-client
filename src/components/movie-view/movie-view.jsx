export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="movie-view">
            <h1>{movie.title}</h1>
            
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

            {/* Button to go back to the previous view */}
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};