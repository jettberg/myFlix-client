import PropTypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {


    return (
        <div onClick={() => { onMovieClick(movieData); }}>{movieData.title}</div>
    );
};


MovieCard.PropTypes = {
        //This is where you specify the properties of the movieCard view/which will be seen and allowed
        //Also shows how you can nest different elements within any given one    


    movieData: PropTypes.shape({

        title: PropTypes.string.isRequired,
        // image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.arrayOf(PropTypes.string).isRequired,
        cast: PropTypes.arrayOf(PropTypes.string).isRequired,
        runtime: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,


    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};