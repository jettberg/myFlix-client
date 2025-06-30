import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router";

export const NavigationBar = ({ user, onLoggedOut, onSearchChange }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movies App
                </Navbar.Brand>
                <Navbar.Toggle aria-controles="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to='/profile'>
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>

                    {user && (
                        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <FormControl
                                type="search"
                                placeholder="Search movies..."
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </Form>
                    )}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};