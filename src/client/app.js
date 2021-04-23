import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UnderConstruction, SignIn, NotAuthorized } from './pages';
import './assets/sass/general.scss';
import { AppContextProvider } from './store/appContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import App from './App';
import { useAppState } from './store';

const Root = ({}) => {
    const { lightMode } = useAppState();

    return (
        <div className={`barnburner ${lightMode ? 'theme--default' : 'theme--dark'}`}>
            <Router>
                <Switch>
                    <Route exact path="/signin" component={ SignIn } />
                    <Route exact path="/auth/error" component={ NotAuthorized } />
                    <Route exact path="/under-construction" component={ UnderConstruction } />
                    <Route component={ App } path="/" />
                </Switch>
            </Router>
        </div>
    )
}

export default Root;