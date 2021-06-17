import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NavigationElement = ({
    id,
    label,
    icon,
    path,
    subelements,
    activeElt,
    onClick
}) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const generateSubElements = () => {
        if (isOpen) {
            return (
                <div className="nav-subelement-container">
                    { subelements.map((elt, key) => {
                        return (
                            <div key={key}
                                className={`nav-subelement ${activeElt.includes((id+'/'+elt.id)) ? 'active' : ''}`}
                                title={ elt.label }
                                onClick={ () => onClick((id + '/' + elt.id), elt.path)}
                            >
                                <span className='nav-label'>
                                    { elt.label }
                                </span>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    const handleClick = () => {
        onClick(id, path)
    }

    return (
        <div className={`nav-element ${activeElt.includes(id) ? 'active' : ''}`}>
            <div
                className={`nav-main-container ${activeElt.includes(id) ? 'active' : ''}`}
                onClick={ handleClick }
                title={label}
            >
                <div className="nav-main">
                    <div className='nav-icon'>
                        <i className={ icon } />
                    </div>
                    <span className='nav-label'>
                        { label }
                    </span>
                </div>
                { subelements.length > 0 && 
                    <div className='nav-toggle' onClick={ () => setIsOpen(!isOpen) } >
                        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} />
                    </div>
                }
            </div>
            { generateSubElements() }
        </div>
    )
}

NavigationElement.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    subelements: PropTypes.array.isRequired,
    activeElt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default NavigationElement;