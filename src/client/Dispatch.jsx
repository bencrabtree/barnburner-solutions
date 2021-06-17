import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { App, Home, SignIn, NotAuthorized, UnderConstruction } from './pages';
import './assets/sass/general.scss';
import MainHeader from './components/MainHeader/MainHeader';
import { useAppState } from './store/index';
import BBSLoading from './components/common/BBSLoading/BBSLoading';
import ProtectedRoute from './util/ProtectedRoute';
import { isLoggedIn } from './util/auth';

const Dispatch = ({}) => {
    const { loading, lightMode } = useAppState();
    const [ newLeadModalIsOpen, setNewLeadModalIsOpen ] = useState(false);
    const [ headerBarOffset, setHeaderBarOffset ] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll);

        return () => {
            window.removeEventListener('scroll', listenToScroll)
        }
    })

    const listenToScroll = () => {
        setHeaderBarOffset(window.pageYOffset < 24)
    }

    const isHomePage = () => {
        return !isLoggedIn() && !!(window.location.pathname === '/')
    }

    const renderApp = () => {
            return (
                <Router>
                    <Switch>
                        <Route exact path="/signin" component={ SignIn } />
                        <Route exact path="/auth/error" component={ NotAuthorized } />
                        <Route exact path="/under-construction" component={ UnderConstruction } />
                        <ProtectedRoute path="/app" component={App} />
                        <Route exact path="/" component={ Home } />
                        <Route path="/" render={() => (<Redirect to="/" />)} />  
                    </Switch>
                </Router>
            )
    }

    return (
        <div className={`dispatch ${lightMode ? 'theme--default' : 'theme--dark'}`}>
            {/* <MainHeader
                newLeadModalIsOpen={newLeadModalIsOpen}
                setNewLeadModalIsOpen={setNewLeadModalIsOpen}
                darkBackground={isHomePage() && headerBarOffset}
            /> */}
            <div className="content">
                { renderApp() }
            </div>
            {/* <footer className="main-footer">
                <div className="text-column">
                    <a href="mailto:ben@barnburner.solutions?subject=Reaching%20Out">
                        Contact Us
                    </a>
                </div>
                <div className="text-column">
                    &copy;2021, BarnBurner Solutions, LLC. All rights reserved.
                </div>
            </footer> */}
        </div>
    );
}

export default Dispatch;