import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';


function SpaceID( {title, index, handleFiles} ) {
    
    return (
        <div>
            <Row className="justify-content-space-between"> 
                <Col>
                    { title }
                </Col>
                <Col>
                    <Button onClick={handleFiles} id={`delete-${index}`} variant="danger">
                        Delete
                    </Button>
                    <Button onClick={handleFiles} id={`open-${index}`} variant="outline-primary">
                        Open
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default SpaceID
