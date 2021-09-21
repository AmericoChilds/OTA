import React from 'react'

import { Container, Row, Col, Button } from 'react-bootstrap'

function Timeline({b1, b2, b3, b4, b5, b6, b7, b8}) {
    console.log(b1);
    return (
        <div>   
                <Row>
                    <Col>1</Col>
                    <Col>&</Col>
                    <Col>2</Col>
                    <Col>&</Col>
                    <Col>3</Col>
                    <Col>&</Col>
                    <Col>4</Col>
                    <Col>&</Col>
                </Row>
                <Row fluid>
                    <Col id="beat-1">
                        { b1 != null ? <Button variant="success">  {b1}  </Button> : <Button variant="primary">   </Button> }
                    </Col>
                    <Col id="beat-2">
                        { b2 != null ? <Button variant="success">   {b2} </Button> : <Button variant="primary">    </Button> }
                    </Col>
                    <Col id="beat-3">
                        { b3 != null ? <Button variant="success">  {b3}  </Button> : <Button variant="primary">    </Button> }
                    </Col>
                    <Col id="beat-4">
                        { b4 != null ? <Button variant="success">  {b4}  </Button> : <Button variant="primary">    </Button> }
                    </Col>
                    <Col id="beat-5">
                        { b5 != null ? <Button variant="success">  {b5}  </Button> : <Button variant="primary">    </Button> }
                    </Col>
                    <Col id="beat-6">
                        { b6 != null ? <Button variant="success">  {b6}  </Button> : <Button variant="primary">    </Button> }
                    </Col>
                    <Col id="beat-7">
                        { b7 != null ? <Button variant="success">  {b7}  </Button> : <Button variant="primary">    </Button> }
                    </Col>
                    <Col id="beat-8">
                        { b8 != null ? <Button variant="success"> {b8}   </Button> : <Button variant="primary">   </Button> }
                    </Col>
                </Row>
        </div>
    )
}

export default Timeline
