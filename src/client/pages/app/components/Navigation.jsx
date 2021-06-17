import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { navElements } from '../../../util/constants';
import { createBrowserHistory } from 'history';
import BBSLogo from '../../../components/common/BBSLogo/BBSLogo';
import NavigationElement from './NavigationElement';

const Navigation = ({
    activePath,
    setActivePath
}) => {
    const history = createBrowserHistory();
    const [ isExpanded, setIsExpanded ] = useState(true);

    const navigateHome = () => {
        history.push('/app');
        history.go(0);
    }

    const handleNavigation = (id, path) => {
        setActivePath(id);
        history.push(path)
        if (id === 'intranet') {
            history.go(0);
        }
    }

    const renderExpand = () => {
        return isExpanded ? 
            <i title="Collapse Panel" onClick={ toggleExpand } className="fas fa-chevron-left" /> :
            <i title="Expand Panel" onClick={ toggleExpand } className="fas fa-chevron-right" />
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const renderNavElements = elements => {
        return elements.map((elt, key) => {
            return (
                <NavigationElement key={key}
                    id={elt.id}
                    label={elt.label}
                    icon={elt.icon}
                    path={elt.path}
                    subelements={elt.subelements}
                    onClick={handleNavigation}
                    activeElt={activePath}
                />
            )
        })
    }

    return (
        <nav className={isExpanded ? 'expanded' : 'collapsed'}>
            <div className='nav-logo'>
                <BBSLogo
                    onClick={navigateHome}
                    showText={isExpanded}
                    textColor="accent"
                />
                <div className="expand-icon">
                    { renderExpand() }
                </div>
                
            </div>
            <div className='nav-element-list'>
                <div className="main-nav-elts">
                    { renderNavElements(navElements.filter(x => x.header)) }
                </div>
                <div className='footer-nav-elts'>
                    { renderNavElements(navElements.filter(x => !x.header)) }
                </div>
            </div>
        </nav>
    )
}

export default Navigation;