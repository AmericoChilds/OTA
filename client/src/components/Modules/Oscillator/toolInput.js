import React from 'react'
import { useState } from 'react';

import { Container, Form, Row, Col } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';

import * as Tone from 'tone';

function ToolInput({type}) {


    const [ value, setValue ] = useState(Tone.Transport.bpm.value);
    const [ curSpace, setCurSpace ] = useState(JSON.parse(localStorage.getItem("cur_space")));

    const handleSliderChange = (e) => {

        setValue(e);

        let updateSpace = JSON.parse(localStorage.getItem("cur_space"));

        if(updateSpace != null) {
            updateSpace.data.devices = { ... updateSpace.data.devices, [type]: e};
        }
        
        Tone.Transport.bpm.value = value;

        localStorage.setItem("cur_space", JSON.stringify(updateSpace));

    }

    switch (type) {
        case "bpm":
            return (
                <Container>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label>BPM</Form.Label>
                            <Col md="9">
                                <RangeSlider
                                    value={Tone.Transport.bpm.value}
                                    min = {50}
                                    max = {500}
                                    onChange={e => handleSliderChange(e.target.value)}
                                />
                            </Col>
                            <Col md="3">
                                <Form.Control value={Tone.Transport.bpm.value}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            );
        default:
            return (
                <></>
            );
    }
        
}

export default ToolInput
