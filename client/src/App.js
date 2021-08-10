import React from 'react';

import {Container, Navbar, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


const App = () => {
    return (
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="#home">Wavespace</Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="me-auto">
                    <Nav.Link href="#features">Spaces</Nav.Link>
                    <Nav.Link href="#signin">Sign-In</Nav.Link>
                </Nav>
            </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}

export default App;