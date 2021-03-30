import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, ArtistPage } from './pages';
import './assets/sass/general.scss';
import MainHeader from './components/MainHeader/MainHeader';
import { useAppState } from './store/index';
import BBSLoading from './components/common/BBSLoading/BBSLoading';
import MyRoster from './pages/myroster/MyRoster';

const App = ({}) => {
    const { loading } = useAppState();

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
                        <Route exact path="/myroster" component={ MyRoster } />
                        {/* <Route exact path="/calendar" component={ MyCalendar } /> */}
                        <Route component={ Home } path="/" />
                    </Switch>
                </Router>
            )
        }
    }

    return (
        <div className='app'>
            <MainHeader />
            <div className='main-app'>
                { renderApp() }
            </div>
        </div>
    );
}

export default App;