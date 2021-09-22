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
                <div className={className}>
                    <InputGroup className="d-flex justify-content-between">
                        <Form className="mt-2 d-inline">
                            <FormControl label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                        </Form>
                        <Button className="mt-2 d-inline" onClick={handleShowPassword} variant="outline-primary">
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                    </InputGroup>
                </div>
            )
        case "c-password":
            return ( 
                <div className={className}>
                        <Form className="mt-2">
                            <FormControl label={label} id={id} onChange={handleChange} type={"password"} placeholder={placeholder} />
                        </Form>

                </div>
            )
        case "text":
            return (
                <div className={className}>
                    <InputGroup className="d-flex justify-content-between" >
                            <Form className="mt-2">
                                <FormControl label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                            </Form>
                            <Button className="mt-2" onClick={handleShowPassword} variant="outline-primary">
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </Button>
                    </InputGroup>
                </div>
            )
        default:
            return (
                <div className={className}>
                    <Form className="mt-2">
                        <FormControl label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                    </Form>
                </div>
            )

    }

}

export default Input

