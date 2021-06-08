import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/general.scss';
import { AppContextProvider } from './store/appContext';
import App from './App';

const Root = () => {
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));