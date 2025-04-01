import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="movie-view">
            <h1>{movie.title}</h1>

            {movie.image && (
                <div className="movie-image">
                    <img src={movie.image} alt={movie.title} />
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
            <button onClick={onBackClick} className="back-button" style={{ cursor: "pointer"}}>Back</button>
        </div>
    );
};