import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import './styles.scss';

import { useState } from 'react';

import APIInputs from './APIInputs';

const APITool = () => {

    const [ curSpace, setCurSpace ] = useState(JSON.parse(localStorage.getItem("cur_space")));

    

    return (
            <>
                <Form>
                    
                    <APIInputs type="r"/>
                    <APIInputs type="p"/>

                </Form>
            </>
    );
}

export default APITool;