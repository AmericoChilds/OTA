import React from 'react';

import Oscillator from '../Modules/Oscillator/Oscillator';
import APITool from '../Modules/APITool/APITool';
import './styles.scss';

const Space = () => {
    return (
        <>
            <h1>SPACE</h1>
            <Oscillator/>
            <APITool/>
        </>
    );
}

export default Space;