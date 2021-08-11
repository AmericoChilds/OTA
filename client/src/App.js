import React, { useEffect } from 'react';
import {Container, Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles.scss';

import './App.css';

import { getPosts } from './actions/posts'
import Navigation from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])

    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;