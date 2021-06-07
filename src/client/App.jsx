import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home, ArtistPage } from './pages';
import './assets/sass/general.scss';
import MainHeader from './components/MainHeader/MainHeader';
import { useAppState } from './store/index';
import BBSLoading from './components/common/BBSLoading/BBSLoading';
import MyRoster from './pages/myroster/MyRoster';
import ProtectedRoute from './util/ProtectedRoute';
import { isLoggedIn } from './util/auth';

const App = ({}) => {
    const { loading } = useAppState();
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
        if (loading) {
            return (
                <BBSLoading />
            )
        } else {
            return (
                <Router>
                    <Switch>
                        <Route component={ ArtistPage } path="/artists/:artistName" />
                        <ProtectedRoute exact path="/myroster" component={ MyRoster } />
                        {/* <Route exact path="/calendar" component={ MyCalendar } /> */}
                        <Route component={ Home } exact path="/" />
                        <Route path="/" render={() => (<Redirect to="/" />)} />  
                    </Switch>
                </Router>
            )
        }
    }

    return (
        <div className='app'>
            <MainHeader
                newLeadModalIsOpen={newLeadModalIsOpen}
                setNewLeadModalIsOpen={setNewLeadModalIsOpen}
                darkBackground={isHomePage() && headerBarOffset}
            />
            <div className="main-container">
                {/* { isLoggedIn() && <SideMenu setNewLeadModalIsOpen={setNewLeadModalIsOpen} /> } */}
                <div className={`main-app`}>
                    { renderApp() }
                </div>
            </div>

        </div>
    );
}

export default App;