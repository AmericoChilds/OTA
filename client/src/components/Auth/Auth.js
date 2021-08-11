import React from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
import {BsPersonFill} from 'react-icons/bs';
import './styles.scss';

const Auth = () => {

    const isSignup = false;

    const handleSubmit = () => {

    };

    return (
        <div>
            <Container>
                <Card>
                    <Card.Header>{isSignup ? 'Sign-Up' : "Sign-In"}</Card.Header>
                    <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Auth
