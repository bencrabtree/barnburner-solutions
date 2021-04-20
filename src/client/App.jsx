import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, ArtistPage } from './pages';
import './assets/sass/general.scss';
import MainHeader from './components/MainHeader/MainHeader';
import { useAppState } from './store/index';
import BBSLoading from './components/common/BBSLoading/BBSLoading';
import MyRoster from './pages/myroster/MyRoster';
import SideMenu from './components/SideMenu/SideMenu';
import ProtectedRoute from './util/ProtectedRoute';
import { isLoggedIn } from './util/auth';

const App = ({}) => {
    const { loading, sideMenuOpen } = useAppState();
    const [ newLeadModalIsOpen, setNewLeadModalIsOpen ] = useState(false);

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
                        <Route component={ Home } path="/" />
                    </Switch>
                </Router>
            )
        }
    }

    return (
        <div className='app'>
            <MainHeader newLeadModalIsOpen={newLeadModalIsOpen} setNewLeadModalIsOpen={setNewLeadModalIsOpen} />
            <div className="main-container">
                { isLoggedIn() && <SideMenu setNewLeadModalIsOpen={setNewLeadModalIsOpen} /> }
                <div className={`main-app ${sideMenuOpen ? "smaller" : ""}`}>
                    { renderApp() }
                </div>
            </div>

        </div>
    );
}

export default App;