import React from 'react'

import { Col, Row, Form } from 'react-bootstrap';

function APIInputs({type}) {

    const handleChange = (id, value) => {

        let updateSpace = JSON.parse(localStorage.getItem("cur_space"));

        if(updateSpace != null) {
            updateSpace.data.api = { ... updateSpace.data.api, [type + "-" + id]: value};
        }
        

        localStorage.setItem("cur_space", JSON.stringify(updateSpace));
    }

    switch (type) {
        case "r":
            
            return(
                <Form.Group as={Row}>
                    <Col>
                    <Form.Label>Rhythm</Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>Data</Form.Label>
                        <Form.Control onClick={e => handleChange(`data`, e.target.value)} as="select" aria-label="Default select example">
                            <option value="temperature">Temperature</option>
                            <option value="humidity">Humidity</option>
                            <option value="windSpeed">Wind Speed</option>
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Interpolation</Form.Label>
                        <Form.Control onClick={e => handleChange(`interp`, e.target.value)} as="select" aria-label="Default select example">
                            <option value="0">Mod</option>
                            <option value="1">Probability</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            );
        case "p":
            return(
            <Form.Group as={Row}>
                <Col>
                <Form.Label>Pitch</Form.Label>
                </Col>
                <Col>
                    <Form.Label>Data</Form.Label>
                    <Form.Control onClick={e => handleChange(`data`, e.target.value)} as="select" aria-label="Default select example">
                        <option value="temperature">Temperature</option>
                        <option value="humidity">Humidity</option>
                        <option value="windSpeed">Wind Speed</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Label>Interpolation</Form.Label>
                    <Form.Control onClick={e => handleChange(`interp`, e.target.value)} as="select" aria-label="Default select example">
                        <option value="0">Mod</option>
                        <option value="1">Probability</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            );

        default:
            return(<></>);
    }
        

}

export default APIInputs
