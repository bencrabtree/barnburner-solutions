import React from 'react';
import BBSLogo from '../../../components/common/BBSLogo/BBSLogo'
import DemoPage from '../../../assets/images/demo-page.png';

const ExternalHome = ({

}) => {
    return (
        <div className="bbs-home">
            <div className="bbs-home-header">
                    <div className="home-header-text">
                        <h1>introducing</h1>
                        <div className="nameplate">BarnBurner Solutions</div>
                        <div className='home-text'>
                            <h2>The last artist management platform you will ever need.</h2>
                        </div>
                    </div>
            </div>
            <div className="bbs-info cards">
                <div className="home-card">
                    <h2>Your Roster At A Glance</h2>
                    <BBSLogo showText={false} />
                    <div className="info-text">
                        <p>Manage your entire roster from one central screen. We've developed a sleek interface with seemless querying and filtering to deliver best in class roster management.</p>
                    </div>
                </div>
                <div className="home-card">
                    <h2>Real-Time Analytics</h2>
                    <BBSLogo showText={false} />
                    <div className="info-text">
                        <p>BarnBurner is the only solution with full social media integration, so you can track how well a certain tour or campaign has effected engagement.</p>
                    </div>
                </div>
                <div className="home-card">
                    <h2>Track New Leads</h2>
                    <BBSLogo showText={false} />
                    <div className="info-text">
                        <p>You have full control over the A&R process through status updates, message boards, and file sharing. Keep the entire team in the loop with one comprehensive dashboard and push notifications.</p>
                    </div>
                </div>
            </div>
            <div className="bbs-info two-columns">
                <div className="photo-and-text">
                    <img src={DemoPage} />
                </div>
                <div className="bbs-text">
                    <div className="floating-logo">
                        <BBSLogo showText={false} />
                    </div>
                    <h1>A Modern Look for a Modern Approach</h1>
                    <div className="info-text">
                        <p>
                            With BarnBurner's state of the art interface, accessing your information has never been easier. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExternalHome;