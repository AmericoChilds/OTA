import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {Container, Navbar, Nav, Dropdown} from 'react-bootstrap';
import decode from 'jwt-decode';

const Navigation = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({type: 'LOGOUT'});

        history.push('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <Navbar collapseOnSelect bg="primary" variant="dark" expand="md">
            <Container>
            <Navbar.Brand href="/">Wavespace</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Link href="/spaces">Spaces</Nav.Link>
                </Nav>
                <Nav>
                    { user ? (
                            <div className="nav-profile">
                                <Dropdown>
                                    <Dropdown.Toggle id="collasible-nav-dropdown">
                                        {user.result.username}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Spaces</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
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