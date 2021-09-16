import { AUTH } from '../constants/actionTypes';
import { getSpace } from './spaces';
import { useDispatch } from 'react-redux';
import * as api from '../api/index';


export const signIn = (formData, history) => async (dispatch) => {
    
    try {
        // Data received from Sign-In process        
        const {data} = await api.signIn(formData);
        // Dispatches data to localstorage
        dispatch({ type: AUTH, data})
        // Redirect to homepage
        history.push('/');

    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        // Data received from Sign-Up process  
        const {data} = await api.signUp(formData);
        // Dispatches data to localstorage
        dispatch({ type: AUTH, data})

        // Redirect to homepage
        history.push('/');

    } catch (error) {
        console.log(error);
    }
}

export function getFunc() {

    try {
        const user = JSON.parse(localStorage.getItem('profile'));

        // User is Google login
        var func = false;

        // If not GoogleID, func = true
        if( user.result?.googleId == null ) {
            func = true;
        }

        return func;
    } catch(error) {
        console.log(error);
    }

}

export function getUserID() {

    try {

        var userID;

        const user = JSON.parse(localStorage.getItem('profile'));

        if( getFunc() ) {
            userID = user.result.email;
        } else {
            userID = user.result.googleId;
        }

        return userID;
    } catch(error) {
        console.log(error);
    }

}
