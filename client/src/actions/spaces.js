import { UDTSPACE, DELSPACE, NEWSPACE, GETSPACE, CURSPACE } from '../constants/actionTypes';
import * as api from '../api/index';

export const getSpace = ( getData ) => async (dispatch) => {

    try {
        // Returns Spaces array
        const {data} = await api.getSpaces( getData );
        // Dispatches data for use
        dispatch({type: GETSPACE, data})

    } catch(error) {
        console.log(error);
    }

}

export const newSpace = (waveData) => async (dispatch) => {

    try {
        // Returns Spaces array
        const {data} = await api.newSpace(waveData);

        dispatch({type: NEWSPACE, data});

    } catch(error) {
        console.log(error);
    }

}

export const delSpace = ( delData ) => async (dispatch) => {

    try {
        // Returns Spaces array
        const {data} = await api.delSpace(delData);

        dispatch({type: DELSPACE, data});

    } catch(error) {
        console.log(error);
    }

}

export const updSpace = ( updData ) => async (dispatch) => {

    try {
        // Returns Spaces array
        const {data} = await api.updateSpace(updData);

        dispatch({type: UDTSPACE, data});

    } catch(error) {
        console.log(error);
    }

}

export const curSpace = ( curData ) => async (dispatch) => {
    
    try {
        // Grab the user's spaces
        const spaces  = JSON.parse(localStorage.getItem('spaces'));
        // Obtain the id to set current
        var { id } = curData;
        let idUsable = id;
        // If id isn't specify, resort to the most recent space
        if( idUsable == null ) {
            let lastIndex = Object.keys(JSON.parse(spaces?.result?.spaces)).length - 1;
            idUsable = lastIndex;
        }
        //
        var data = JSON.parse(spaces.result.spaces);
        
        if( spaces != null ) {
            data = data[idUsable];
            data["id"] = idUsable;
        }

        //dispatch({type: CURSPACE, data});
        localStorage.setItem('cur_space', JSON.stringify({ data }));
    } catch(error) {
        console.log(error);
    }

}