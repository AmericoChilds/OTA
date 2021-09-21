import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import './styles.scss';

const Home = () => {

    return (
        <>
            <Container className="containerHome">
                <Row>
                    <h1 className="mt-5">Stay Inspired. <br/>Generate Music Through API </h1>
                    <p className="mb-3">Wavespace is a tool, powered by weather API data, to generate novel 1 bar, musical patterns. <br/>Sign-in to give it a whirl!</p>
                </Row>
                <Row>
                    <Col className="mr-2" md={1}>
                        <Button href="https://github.com/AmericoChilds/OTA">Github</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Home;