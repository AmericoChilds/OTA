import React from 'react';
import { Container, Nav, Navbar, Button, Modal, NavDropdown, Row, Col } from 'react-bootstrap';
import Input from '../../Auth/Input'

import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import {newSpace, delSpace, curSpace} from '../../../actions/spaces';

const initialState = { title: '' };
var init = { userID: '', spaces: {[1]: "hey", [2]: "what", [3]: "okay"}}

const Taskbar = ({type}) => {

    const dispatch = useDispatch();

    // Wavespace Data
    const [waveSpaces, setWaveSpaces] = useState(init) ;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [waveData, setWaveData] = useState(initialState);

    const [showNew, setShowNew] = useState(false);
    const handleCloseNew = () => setShowNew(false);
    const handleShowNew = () => setShowNew(true);

    const [showOpen, setShowOpen] = useState(false);
    const handleCloseOpen = () => setShowOpen(false);
    const handleShowOpen = () => setShowOpen(true);

    const handleChange = (e) => {

        var userID = "";
        var func = false;
        
        if( user.result?.googleId == null ) {
            userID = user.result.email;
            func = true;
        } else {
            userID = user.result.googleId;
        }

        setWaveData({ ... waveData, [e.target.id]: e.target.value, userID, func})
    }

    const handleFiles = (e) => {
        // Split the target id (encoded type and id of space)
        const split = e.target.id.split('-');
        const type = split[0];
        const id = split[1];
        var userID = "";
        // User is Google login
        var func = false;

        // Check type of login
        if( user.result?.googleId == null ) {
            userID = user.result.email;
            func = true;
        } else {
            userID = user.result.googleId;
        }

        if(type == "delete") {
            dispatch(delSpace({ userID, id, func }));
        } else {
            dispatch(curSpace({ userID, id, func }));
        }
    }

    //////////////////
    ///   Spaces   ///
    //////////////////

    const createSpace = () => {
        dispatch(newSpace(waveData));
    }

    switch (type) {
        case "spaces":
            
            return(
                <>
                    <Navbar variant="dark" bg="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbar-dark-example" />
                        <Navbar.Collapse id="navbar-dark-example">
                        <Nav>
                            <NavDropdown
                            title="File"
                            menuvariant="dark"
                            >
                                <NavDropdown.Item onClick={handleShowNew}>New</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleShowOpen}>Open</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>

                    {/* ========= */}
                    {/* New Modal */}
                    
                    <Modal show={showNew} onHide={handleCloseNew}>
                        <Modal.Header>
                        <Modal.Title>Create New Wavespace</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Input id={"title"} handleChange={handleChange} placeholder={"Title"}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseNew}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={createSpace}>
                            Create
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* ========== */}
                    {/* Open Modal */}

                    <Modal show={showOpen} onHide={handleCloseOpen}>
                        <Modal.Header>
                        <Modal.Title>Open a Wavespace</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                            {
                                Object.keys(waveSpaces.spaces).map(
                                    ( _item, _index ) => (
                                            <>
                                                <Row className="justify-content-space-between"> 
                                                    <Col>
                                                        {waveSpaces.spaces[_item]}
                                                    </Col>
                                                    <Col>
                                                        <Button onClick={handleFiles} id={`delete-${_index}`} variant="danger">
                                                            Delete
                                                        </Button>
                                                        <Button onClick={handleFiles} id={`open-${_index}`} variant="outline-primary">
                                                            Open
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </>
                                    )
                                )
                            }
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseOpen}>
                            Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </>
            );
    
        default:
            return(
                <>
                </>
            );
    }

}

export default Taskbar

