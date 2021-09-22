import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react';

import Rack from '../Rack/Rack';
import MapGraph from '../MapGraph/MapGraph';
import Oscillator from '../../Modules/Oscillator/Oscillator';
import Timeline from '../UIElements/Timeline/Timeline';
import APITool from '../../Modules/APITool/APITool';

import "./styles.scss"

import NoSpaces from '../../Space/NoSpaces';

import { processWD } from '../../../actions/utility';
import { updSpace } from '../../../actions/spaces';

import { getUserID, getFunc } from '../../../actions/auth';

import { useDispatch } from 'react-redux';

var spacesData = { userID: "", spaces: {} };

function Board( {handleAPIData, handleOsci} ) {

    const [curSpace, setCurSpace] = useState(JSON.parse(localStorage.getItem('cur_space')));

    const dispatch = useDispatch();

    const setNotes = () => {

        if( curSpace != null ) {
            console.log(curSpace.data.devices.notes);
            if( curSpace?.data?.devices?.notes == null ) {
                console.log("heya");
                return false;
            }
        }
        

        return true;
    }

    const refreshCurrent = () => {
        processWD();
        window.location.reload();
    }

    const saveCurrent = () => {

        let spaces = JSON.parse(localStorage.getItem("spaces"));
        let user = JSON.parse(localStorage.getItem("profile"));
        let cur = JSON.parse(localStorage.getItem("cur_space"));

        let userID = getUserID();
        let func = getFunc();
        let devices = cur.data.devices;
        let api = cur.data.api;
        let id = cur.data.id;
        let title = cur.data.title;


        dispatch(updSpace({title, userID, func, devices, api, id}));
    }

    return (
        <div>
                <Container>
                    <Row className="mt-3 mx-auto d-flex align-content-center">
                        <Col className="mx-auto">
                            <Timeline 
                                    b1={curSpace.data.devices?.notes[0]}
                                    b2={curSpace.data.devices?.notes[1]}
                                    b3={curSpace.data.devices?.notes[2]}
                                    b4={curSpace.data.devices?.notes[3]}
                                    b5={curSpace.data.devices?.notes[4]}
                                    b6={curSpace.data.devices?.notes[5]}
                                    b7={curSpace.data.devices?.notes[6]}
                                    b8={curSpace.data.devices?.notes[7]}
                                />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Oscillator handleOsci={handleOsci}/>
                        </Col>
                        <Col>
                            <APITool handleAPIData={handleAPIData}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Button onClick={refreshCurrent}>Interpolate</Button></Col>
                        <Col><Button  onClick={saveCurrent}>Save</Button></Col>
                    </Row>
                </Container>
        </div>
    )
}

export default Board

