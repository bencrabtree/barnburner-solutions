import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/general.scss';
import { AppContextProvider } from './store/appContext';
import Root from './app.js';

const BB = () => {
    return (
        <AppContextProvider>
            <Root />
        </AppContextProvider>
    )
}

ReactDOM.render(<BB />, document.getElementById('root'));