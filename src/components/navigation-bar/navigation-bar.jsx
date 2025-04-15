import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router";

export const NavigationBar = ({ user, onLoggedOut }) => {
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
                </Navbar.Collapse>
            </Container>
            </Navbar>
    );
};