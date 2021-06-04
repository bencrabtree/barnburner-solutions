import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../../store';
import BBSButton from '../common/BBSButton/BBSButton';
import Drawer from '@material-ui/core/Drawer';
import './side-menu.scss';

const SideMenu = ({
    setNewLeadModalIsOpen
}) => {
    const history = useHistory();
    const { sideMenuOpen } = useAppState()

    const handleTabSelection = id => {
        let path = "/" + id;
        history.push(path)
        history.go(0);
    }

    const generateTabItems = () => {
        const tabs = [
            { id: 'myroster', label: 'Roster', icon: 'fas fa-address-book' },
            { id: 'calendar', label: 'Calendar', icon: 'fas fa-calendar' }
        ];

        return tabs.map((elt, key) => {
            return (
                <div className={
                    `side-menu-item
                    ${history.location.pathname === "/" + elt.id ? 'active' : 'inactive'}`}
                    onClick={() => handleTabSelection(elt.id)}
                    key={key}
                >
                    <i className={elt.icon}></i>
                    <h2>{ elt.label }</h2>
                </div>
            )
        })
    }

    return (
        <>

        </>

    )
}

export default SideMenu;