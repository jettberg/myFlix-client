export const MovieCard = ({ movieData, onMovieClick }) => {


    return (
        <div onClick={() => { onMovieClick(movie); }}>{movie.title}</div>
    );
};
