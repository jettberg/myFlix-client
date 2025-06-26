import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { Button, Form } from "react-bootstrap";

export const ProfileView = ({ user, token, onLogout, movies }) => {
  const [userInfo, setUserInfo] = useState(user);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: user.Username,
    email: user.Email,
    birthday: user.Birthday,
    password: ""
  });

  useEffect(() => {
    if (!user || !token) return;

    fetch(`https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((userProfile) => {
        setUserInfo(userProfile);

        const favoriteMoviesList = userProfile.FavoriteMovies
          .map(movieId => movies.find(movie => movie.id === movieId))
          .filter(Boolean);

        setFavoriteMovies(favoriteMoviesList);
      })
      .catch((error) => console.error('Failed to fetch updated profile:', error));
  }, [user, token, movies]);



  const handleUpdate = (e) => {
    e.preventDefault();

    // this is the object for the data that will be changed
    const updatedData = {
      username: updatedUserInfo.username,
      email: updatedUserInfo.email,
      birthday: updatedUserInfo.birthday,
      password: updatedUserInfo.password || undefined
    };

    // Connecting the request to the database
    fetch(`https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user information');
        }
        return response.json();
      })
      .then((updatedUser) => {
        o
        setUserInfo(updatedUser);
        setUpdatedUserInfo({
          username: updatedUser.Username,
          email: updatedUser.Email,
          birthday: updatedUser.Birthday,
          password: ''
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const handleFavoriteToggle = (movieId) => {
    const isFavorite = userInfo.FavoriteMovies.includes(movieId);

    const method = isFavorite ? 'DELETE' : 'POST';
    const url = `https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/users/${user.Username}/movies/${movieId}`;

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update favorites');
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUserInfo(updatedUser);

        const updatedFavorites = updatedUser.FavoriteMovies
          .map(id => movies.find(movie => movie.id === id))
          .filter(Boolean);

        setFavoriteMovies(updatedFavorites);
      })
      .catch(error => console.error(error));
  };



  const handleDeregister = () => {

  };




  return (
    <div className="profile-view">
      <h2>User Profile</h2>
      {isEditing ? (
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={updatedUserInfo.username}
              onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={updatedUserInfo.email}
              onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={updatedUserInfo.birthday}
              onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, birthday: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={updatedUserInfo.password}
              onChange={(e) => setUpdatedUserInfo({ ...updatedUserInfo, password: e.target.value })}
            />
          </Form.Group>

          <Button type="submit">Save Changes</Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>Back</Button>
        </Form>
      ) : (
        <div>
          <p>Username: {userInfo.Username}</p>
          <p>Email: {userInfo.Email}</p>
          <p>Birthday: {userInfo.Birthday}</p>
          <h3>Favorite Movies</h3>
          <div className="movie-cards d-flex flex-wrap gap-4">
            {favoriteMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movieData={movie}
                onMovieClick={() => { }}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          <Button variant="danger" onClick={handleDeregister}>Deregister</Button>
        </div>
      )}
    </div>
  );
};