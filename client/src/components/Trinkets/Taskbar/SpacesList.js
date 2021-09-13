import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap'

function SpacesList({ waveSpaces, handleFiles }) {
    return (
        <>
            {Object.keys(JSON.parse(waveSpaces.result.spaces)).map(
                ( _item, _index ) => (
                        <>
                            <Row className="justify-content-space-between"> 
                                <Col>
                                    {JSON.parse(waveSpaces.result.spaces)[_index].title}
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
            )}
        </>
    )
}

export default SpacesList
