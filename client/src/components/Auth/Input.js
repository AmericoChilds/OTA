import React from 'react'
import { Button, Form, InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import './styles.scss'

const Input = ({id, className, handleChange, type, placeholder, label, handleShowPassword}) => {
    // Switch set up for input types
    // Password, Confirm Password, Text, Default
    switch (type) {
        case "password":
            return ( 
                <div className="input-group input-group-lg w-25 mx-auto">
                    <InputGroup >
                            <Form controlId={"formGroup" + id}>
                                <FormControl label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                            </Form>
                            <Button onClick={handleShowPassword} variant="outline-primary">
                                <FontAwesomeIcon icon={faEye} />
                            </Button>
                    </InputGroup>
                </div>
            )
        case "c-password":
            return ( 
                <>
                    <InputGroup>
                        <Form.Group className={className} controlId={"formGroup" + id}>
                            <FormControl className={className} label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                        </Form.Group>
                    </InputGroup>
                </>
            )
        case "text":
            return (
                <>
                    
                    <InputGroup>
                        <Form className="mx-auto" controlId={"formGroup" + id}>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <FormControl label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                                </Col>
                                <Col md="auto">
                                    <Button onClick={handleShowPassword} variant="outline-primary">
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </InputGroup>
                </>
            )
        default:
            return (
                <>
                    <Form.Group className={className} controlId={"formGroup" + id}>
                        <Form.Label>{label}</Form.Label>
                        <Form.Control className={className} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                    </Form.Group>
                </>
            )

    }

}

export default Input

