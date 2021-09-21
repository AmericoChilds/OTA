import React from 'react'
import { useState } from 'react';
import { DropdownButton, Dropdown, ButtonGroup, Form } from 'react-bootstrap';
import FloatingLabel from "react-bootstrap-floating-label";

function DropDownUtil({type}) {

    const [ curSpace, setCurSpace ] = useState(JSON.parse(localStorage.getItem("cur_space")));
    
    const handleDropDownScale = ( mode ) => {


        let updateSpace = JSON.parse(localStorage.getItem("cur_space"));

        console.log(updateSpace);

        if(updateSpace != null) {
            updateSpace.data.devices = { ... updateSpace.data.devices, [type]: mode};
        }
        

        localStorage.setItem("cur_space", JSON.stringify(updateSpace));

    }

        switch (type) {
            case "scale":
                
                return (
                    <>
                        <DropdownButton
                            as={ButtonGroup}
                            key="primary"
                            title="Scales"
                        >
                            <Dropdown.Item eventKey="1" onClick={e => handleDropDownScale(0) }>Chromatic</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={e => handleDropDownScale(1) }>Major</Dropdown.Item>
                            <Dropdown.Item eventKey="3" onClick={e => handleDropDownScale(2) }>Minor</Dropdown.Item>
                        </DropdownButton>
                    </>
                );
        
            default:
                return( <></>);
        }
            
}

export default DropDownUtil
