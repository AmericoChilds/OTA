import React, { useEffect } from 'react';
import {Container, Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './styles.scss';

import './App.css';

import { getPosts } from './actions/posts'
import { getSpace } from './actions/spaces'
import Navigation from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Space from './components/Space/Space';

const App = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {

        if( user != null ) {

            var func = false;
            var userID;

            if( user.result?.googleId == null ) {
                userID = user.result.email;
                func = true;
            } else {
                userID = user.result.googleId;
            }

            dispatch(getSpace({userID, func}))
    
        }
    }, [dispatch])


    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/spaces"/> ) } />
                <Route path="/spaces" exact component={Space} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;