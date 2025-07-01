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



  const renderTooltip = (props, message) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );



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
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) =>
              renderTooltip(
                props,
                "Username must be at least 5 characters and contain only letters and numbers."
              )
            }
          >
            <Form.Label style={{ cursor: "help" }}>Username:</Form.Label>
          </OverlayTrigger>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={5}
          />
        </Form.Group>

        <Form.Group controlId="SignupFormPassword">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) =>
              renderTooltip(
                props,
                "Password is required."
                //If adding more password rules, add here
              )
            }
          >
            <Form.Label style={{ cursor: "help" }}>Password:</Form.Label>
          </OverlayTrigger>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) =>
              renderTooltip(
                props,
                "Please enter a valid email address."
              )
            }
          >
            <Form.Label style={{ cursor: "help" }}>Email:</Form.Label>
          </OverlayTrigger>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) =>
              renderTooltip(
                props,
                "Birthday is required."
              )
            }
          >
            <Form.Label style={{ cursor: "help" }}>Birthday:</Form.Label>
          </OverlayTrigger>
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