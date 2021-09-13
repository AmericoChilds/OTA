import { UDTSPACE, DELSPACE, NEWSPACE, GETSPACE, CURSPACE } from '../constants/actionTypes';
import * as api from '../api/index';

export const getSpace = ( getData ) => async (dispatch) => {

    try {
        console.log("VVVVVVVVVVVVVVVV");
        console.log(getData);
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

        const { id } = JSON.parse(localStorage.getItem('spaces'));
        
        // Returns Spaces array
        const {data} = await api.updateSpace();

        dispatch({type: CURSPACE, data});

    } catch(error) {
        console.log(error);
    }

}