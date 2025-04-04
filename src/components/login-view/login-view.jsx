
import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import './login-view.scss';


export const LoginView = ({onLoggedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
 
    const handleSubmit = (event) => {
        event.preventDefault();


//only adding this because the API that i am using to POST to isnt working
        const mockUser = { username: "testuser", id: 1};
        const mockToken = "mocked-token-12345";


        const data = {
            access: username,
            secret: password
        };

//only adding this too to bypass the login state
        if (username === "testuser" && password === "testpassword") {
            localStorage.setItem("user", JSON.stringify(mockUser));
            localStorage.setItem("token", mockToken);
            onLoggedIn(mockUser, mockToken);
            return;
        }else {

        fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            }else{
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong!");
        });
    };
};
    return (
        <form onSubmit={handleSubmit}>
            <Form.Group controlId = "formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text" 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    required 
                    minLength="3"
                    />
            </Form.Group>

            <Form.Group controlId="formPassword">
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
{/* this is the username:
testuser
this is the password:
testpassword */}
        </form>
    );
};