import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './home.scss';
import BBSLogo from '../../components/common/BBSLogo/BBSLogo'
import ParticleBackground from './components/Particles';

const Home = ({ }) => {

    return (
        <div className="bbs-home">
            <ParticleBackground />
            <div className="bbs-home-header">
                <h2>introducing</h2>
                <h1>BarnBurner Solutions</h1>
                <div className='home-text'>
                    <p>The last artist management platform you will ever need.</p>
                </div>
            </div>
            <div className="bbs-info">
                <div className="home-card">
                    <h2>Your Roster At A Glance</h2>
                    <BBSLogo showText={false} />
                    <p>Manage your entire roster from one central screen. We've developed a sleek interface with seemless querying and filtering to deliver best in class roster management.</p>
                </div>
                <div className="home-card">
                    <h2>Real-Time Analytics</h2>
                    <BBSLogo showText={false} />
                    <p>BarnBurner is the only solution with full social media integration, so you can track how well a certain tour or campaign has effected engagement.</p>
                </div>
                <div className="home-card">
                    <h2>Track New Leads</h2>
                    <BBSLogo showText={false} />
                    <p>You have full control over the A&R process through status updates, message boards, and file sharing. Keep the entire team in the loop with one comprehensive dashboard and push notifications.</p>
                </div>
            </div>
        </div>
    )
}

export default Home;