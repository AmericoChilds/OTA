import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import "./styles.scss"

var spacesData = { userID: "", spaces: {} };

function Board() {

    

    return (
        <div>
            <Container fluid className="boardParent">
                <Row>
                    <Col className="md-1 colStyle">
                        <h1>Test</h1>
                    </Col>
                    <Col>
                    <   h1>Test</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Board

