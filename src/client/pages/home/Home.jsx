import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './home.scss';
import BBSLogo from '../../components/common/BBSLogo/BBSLogo'
import ParticleBackground from './components/Particles';
import { useAppState } from '../../store';
import DemoPage from '../../assets/images/demo-page.png';

const Home = ({ }) => {
    const { userProfile } = useAppState();

    const renderContent = () => {
        switch (userProfile.company) {
            case 'BarnBurner':
            default:
                return renderDefaultContent();
        }
    }

    const renderDefaultContent = () => {
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
                <div className="bbs-info cards">
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
                <div className="bbs-info two-columns">
                    <div className="photo-and-text">
                        <img src={DemoPage} />
                    </div>
                    <div className="bbs-text">
                        <h1>A Modern Look for a Modern Approach</h1>
                        <p>
                            With BarnBurner's state of the art interface, accessing your information as never been easier. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className='bbs-home-footer'>
                    <p>All rights reserved to BarnBurner Solutions, LLC</p>
                </div>
            </div>
        )
    }

    return renderContent();
}

export default Home;