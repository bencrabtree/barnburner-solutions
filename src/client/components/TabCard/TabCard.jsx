import React from 'react';
import PropTypes from 'prop-types';
import './tab-card.scss';
import BBSIcon from '../common/BBSIcon/BBSIcon';

const TabCard = ({
    tabs,
    activeTab,
    actions,
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

    const renderActions = () => {
        if (actions) {
            return (
                <div className="tab-actions">
                    { actions.map((action, key) => {
                        return (
                            <div className='tab-action' key={key}>
                                { action }
                            </div>
                        )
                    }) }
                </div>
            )
        }
    }

    return (
        <div className='tab-card card-rounded'>
            <div className='tab-container'>
                <div className='tab-labels'>
                    { renderTabs() }
                </div>
                { renderActions() }
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
    actions: PropTypes.arrayOf(PropTypes.node),
    activeTab: PropTypes.string.isRequired
}

export default TabCard;