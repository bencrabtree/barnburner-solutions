import React from 'react';
import PropTypes from 'prop-types';
import './tab-card.scss';

const TabCard = ({
    tabs,
    activeTab,
    children
}) => {

    const renderTabs = () => {
        return tabs.map((tab, key) => {
            return (
                <div key={key}
                    className={`tab ${tab.id === activeTab ? 'active' : ''}`}
                    onClick={ tab.onClick }
                >
                    <h2>{ tab.label }</h2>
                </div>
            )
        })
    }

    return (
        <div className='tab-card card'>
            <div className='tab-container'>
                { renderTabs() }
            </div>
            <div className='tab-card-content'>
                { children }
            </div>
        </div>
    )
}

TabCard.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func
    })).isRequired,
    activeTab: PropTypes.string.isRequired
}

export default TabCard;