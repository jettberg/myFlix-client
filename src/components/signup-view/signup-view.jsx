import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './signup-view.scss';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(async (response) => {
        const errorData = await response.json();

        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          console.error("Signup error:", errorData);
          if (errorData?.errors) {
            setErrors(errorData.errors.map((e) => e.msg));
          } else {
            setErrors([errorData.message || "Signup failed with unknown error"]);
          }
        }
      })
      .catch((error) => {
        console.error("Network or fetch error:", error);
        setErrors([error.message || "Network error during signup"]);
      });
  };

return (
  <div>
    {errors.length > 0 && (
      <div className="error-messages" style={{ color: "red", marginBottom: "1rem" }}>
        <ul>
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <Form.Group controlId="SignupFormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="SignupFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="back-button">
        Submit
      </Button>
    </form>
  </div>
);
};