import React from 'react';
import { Container, Nav, Navbar, Button, Modal, NavDropdown, Row, Col } from 'react-bootstrap';
import Input from '../../Auth/Input'

import { useEffect, fetchData } from 'react';

import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import {newSpace, updSpace, delSpace, curSpace} from '../../../actions/spaces';
import { getFunc, getUserID } from '../../../actions/auth';
import SpacesList from './SpacesList';

import { useHistory } from 'react-router';

const initialState = { title: '' };
var init = { userID: '', spaces: {[1]: "hey", [2]: "what", [3]: "okay"}}

const Taskbar = ({type, handleStart, handleStop, handlePause}) => {

    const dispatch = useDispatch();

    // Wavespace Data
    const [waveSpaces, setWaveSpaces] = useState(JSON.parse(localStorage.getItem('spaces')));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [waveData, setWaveData] = useState(initialState);

    const [showNew, setShowNew] = useState(false);
    const handleCloseNew = () => setShowNew(false);
    const handleShowNew = () => setShowNew(true);

    const [showOpen, setShowOpen] = useState(false);
    const handleCloseOpen = () => setShowOpen(false);
    const handleShowOpen = () => setShowOpen(true);

    const history = useHistory();

    window.addEventListener('storage', () => {
        setWaveSpaces(JSON.parse(localStorage.getItem('spaces')) || []);
    });

    const waveDataExists = () => {
        if(waveSpaces?.result != null) {
            return true;
        } else {
            return false;
        }
    }

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
        var func = getFunc();

        userID = getUserID();

        if(type == "delete") {
            dispatch(delSpace({ userID, id, func }));
            window.location.reload();
        } else {
            dispatch(curSpace({ userID, id, func }));
            window.location.reload();
        }

    }


    //////////////////
    ///   Spaces   ///
    //////////////////

    const createSpace = () => {
        dispatch(newSpace(waveData));
        dispatch(curSpace({id: 1}));
        window.location.reload();
    }

    switch (type) {
        case "spaces":
            
            return(
                <>
                    <Navbar variant="dark" bg="dark" expand="lg">
                        <Container className="justify-contents-center">
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

                            {/* ========= */}
                            {/*   Media   */}

                            <Button onClick={handleStart} variant="success">Play</Button>
                            <Button onClick={handlePause} variant="primary">Pause</Button>
                            <Button onClick={handleStop} variant="danger">Stop</Button>
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
                                    waveDataExists() && ( <SpacesList waveSpaces={waveSpaces} handleFiles={handleFiles}/>)
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

