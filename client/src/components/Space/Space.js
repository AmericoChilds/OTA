import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Oscillator from '../Modules/Oscillator/Oscillator';
import APITool from '../Modules/APITool/APITool';
import './styles.scss';

import Taskbar from '../Trinkets/Taskbar/Taskbar';
import Board from '../Trinkets/Board/Board';

const Space = () => {

    

    return (
        <>
            <Taskbar type="spaces" />
            <Board/>
        </>
    );
}

export default Space;