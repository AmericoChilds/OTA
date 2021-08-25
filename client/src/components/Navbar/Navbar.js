import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Container, Navbar, Nav, Dropdown} from 'react-bootstrap';

const Navigation = () => {
    const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        // JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [])

    return (
        <Navbar collapseOnSelect bg="primary" variant="dark" expand="md">
            <Container>
            <Navbar.Brand href="#home">Wavespace</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Link href="#features">Spaces</Nav.Link>
                </Nav>
                <Nav>
                    { user ? (
                            <div className="nav-profile">
                                <Dropdown>
                                    <Dropdown.Toggle id="collasible-nav-dropdown">
                                        {user.result.name.split(' ')[0]}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Spaces</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                    ) : (
                        <Nav.Link href="auth">Sign-In</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default Navigation;