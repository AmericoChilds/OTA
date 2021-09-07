import React, { useEffect } from 'react';
import {Container, Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './styles.scss';

import './App.css';

import { getPosts } from './actions/posts'
import Navigation from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Space from './components/Space/Space';

const App = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getPosts());
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