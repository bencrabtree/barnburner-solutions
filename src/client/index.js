import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/general.scss';
import { AppContextProvider } from './store/appContext';
import Dispatch from './Dispatch';

const Root = () => {
    return (
        <AppContextProvider>
            <Dispatch />
        </AppContextProvider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));