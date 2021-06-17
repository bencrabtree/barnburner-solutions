import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './home.scss';
import { useAppState } from '../../store';
import Company from './components/Company';
import ExternalHome from './components/ExternalHome';

const Home = ({ }) => {
    const { userProfile } = useAppState();

    const renderContent = () => {
        switch (userProfile.company) {
            case 'BarnBurner':
                return <Company />
            default:
                return <ExternalHome />
        }
    }

    return renderContent();
}

export default Home;