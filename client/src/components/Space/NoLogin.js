import React from 'react'

import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router';

const NoLogin = () => {

    const history = useHistory();

    const redirect = () => {
        history.push("/auth");
    }

    return (
        <Container>
            <h1 className="mt-5">Hey! Not So Fast!</h1>
            <p className="d-inline">Have I seen you in these parts? How about you </p>
            <a className="d-inline" onClick={redirect}>Sign-In</a>
            <p className="d-inline">?</p>
        </Container>
    )
}

export default NoLogin
