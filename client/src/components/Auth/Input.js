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
                    <InputGroup >
                        <Form>
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
                <div className={className}>
                    <InputGroup>
                        <Form>
                            <FormControl label={label} id={id} onChange={handleChange} type={"password"} placeholder={placeholder} />
                        </Form>
                    </InputGroup>
                </div>
            )
        case "text":
            return (
                <div className={className}>
                    <InputGroup >
                            <Form>
                                <FormControl label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                            </Form>
                            <Button onClick={handleShowPassword} variant="outline-primary">
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </Button>
                    </InputGroup>
                </div>
            )
        default:
            return (
                <div className={className}>
                    <Form>
                        <FormControl label={label} id={id} onChange={handleChange} type={type} placeholder={placeholder} />
                    </Form>
                </div>
            )

    }

}

export default Input

