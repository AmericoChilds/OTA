import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap'
import { useState } from 'react';

import SpaceID from './SpaceID'

function SpacesList({ handleFiles }) {

    const [waveSpaces, setWaveSpaces] = useState(JSON.parse(localStorage.getItem('spaces')));

    return (
        <>
            {Object.keys(JSON.parse(waveSpaces.result.spaces)).map(
                ( _item, _index ) => (
                        <>
                            <SpaceID handleFiles={handleFiles} title={JSON.parse(waveSpaces.result.spaces)[_index].title} index={_index}/>
                        </>
                )
            )}
        </>
    )
}

export default SpacesList
