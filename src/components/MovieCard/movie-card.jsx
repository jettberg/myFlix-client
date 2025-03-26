import PropTypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {


    return (
        <div onClick={() => { onMovieClick(movieData); }}>{movieData.title}</div>
    );
};


MovieCard.PropTypes = {
    movieData: PropTypes.shape({

//This is where you specify the properties of the movieCard view/which will be seen and allowed
//Also shows how you can nest different elements within any given one
title: PropTypes.string.isRequired,

image: PropTypes.string.isRequired,

author: PropTypes.string,

genre: PropTypes.shape({
  name: PropTypes.string,
})

    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};