import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";
import "./movie-card.scss";


export const MovieCard = ({ movieData, onMovieClick, onFavoriteToggle }) => {
    const handleClick = () => {
        console.log('Clicked remove button for:', movieData._id);
        onFavoriteToggle(movieData._id);
    }
    return (
      <Card className='h-100' style={{ width: '18rem' }}>
        <Card.Img
          variant="top"
          src={movieData.image}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text>{movieData.director}</Card.Text>
  
          <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
            <Button
              onClick={() => onMovieClick(movieData)}
              variant="link"
            >
              Open
            </Button>
          </Link>
  
          {onFavoriteToggle && (
            <Button
              variant="danger"
              size="sm"
              className="mt-2"
              onClick={handleClick}
            >
              Remove from Favorites
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  };


MovieCard.PropTypes = {
    //This is where you specify the properties of the movieCard view/which will be seen and allowed
    //Also shows how you can nest different elements within any given one    


    movieData: PropTypes.shape({

        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.arrayOf(PropTypes.string).isRequired,
        cast: PropTypes.arrayOf(PropTypes.string).isRequired,
        runtime: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,


    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
    onFavoriteToggle: PropTypes.func.isRequired
}; 