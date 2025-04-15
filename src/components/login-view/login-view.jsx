
import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import './login-view.scss';


export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
 
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
        };


        fetch("https://movies-my-flix-application-7f3ae970a7e3.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.token && data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            }else{
                setErrorMessage("Invalid Username or Passowrd");
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
            setErrorMessage("Something went wrong!");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Form.Group controlId = "LoginFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    required 
                    minLength="3"
                    />
            </Form.Group>

            <Form.Group controlId="LoginFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </Form.Group>

            <Button 
                variant = "link"
                type = "button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    {passwordVisible ? "Hide" : "Show"} Password
            </Button>

            <Button
            variant = "Primary"
            type = "submit"
            className="back-button" 
            style={{ cursor: "pointer"}}
            >
                Submit
            </Button>
        </form>
    );
};