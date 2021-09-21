import React from 'react';
import './styles.scss';

import { Container, Row, Col, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import ToolInput from './toolInput';
import DropDownUtil from './DropDownUtil';

const Oscillator = ({handleOsci}) => {

    

    return (
            <Container>
                <Row>
                    <Col>
                        <ToolInput type="bpm"/>
                    </Col>
                    
                </Row>
                <Row>
                    <DropDownUtil type="scale"/>
                </Row>
            </Container>
    );
}

export default Oscillator;