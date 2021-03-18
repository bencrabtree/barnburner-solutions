import React from 'react';
import BBSIcon from '../../components/common/BBSIcon/BBSIcon';
import BBSLink from '../../components/common/BBSLink/BBSLink';
import './under-construction.scss';

const UnderConstruction = () => {

    return (
        <div className='non-home-div'>
            <div className='non-home-body'>
                <BBSIcon type='under-construction' />
                <h1>This site is under contruction.</h1>
                <h2>Come back later to see what we're building!</h2>

                <div className='home-page'>
                    <h2>While you wait, check out what else we're building by clicking below.</h2>
                    <BBSLink href="https://www.minttalentgroup.com">
                        <BBSIcon type='mtg-logo-black' />
                    </BBSLink>
                </div>
            </div>
        </div>
    )
}

export default UnderConstruction;