import React, { useState, useEffect } from 'react';
import './company.scss';
import { useAppState } from '../../../store';
import Carousel from 'react-material-ui-carousel';

const carouselitems = [
    { id: 1, title: 'Make Sure To Enter TimeSheets', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 2, title: 'Office Reopens September 15th', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 3, title: 'Happy Hour Extended to All Day Friday', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 4, title: 'Fourth Title Needed For Home Page', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }
]

const Company = ({

}) => {
    const { userProfile } = useAppState();

    const renderCarouselItems = () => {
        return carouselitems.map((elt, key) => {
            return (
                <div className='carousel-item' key={elt.id} >
                    <h1>{ elt.title }</h1>
                    <p>{ elt.description }</p>
                </div>
            )
        })
    }

    return (
        <div className={`company-home ${userProfile.company.toLowerCase()}`}>
            <div className='company-header'>
                <div className='company-carousel-wrapper'>
                    <Carousel
                        className="company-carousel"
                        animation="slide"
                        indicatorContainerProps={{
                            className: "carousel-indicators"
                        }}
                    >
                        { renderCarouselItems() }
                    </Carousel>
                </div>
                <div className='quick-links card-rounded'>
                    <h1>Quick Links</h1>
                    <div className="link-container">
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                        <div className='link'>
                            <p>Here's A Link</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="company-banner">
                <div className="banner-title">
                    <i className="fas fa-exclamation-triangle"></i>
                    <h1>Some All Company Alert Here</h1>
                </div>
                <div className="banner-description">
                    <p>
                        Something about that all company alert with potentially a <a href="#">link</a> to another page.
                    </p>
                </div>
            </div>
            <div className="three-columns">
                <div className="small-info card-rounded">
                    <h2>Info Article</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="small-info card-rounded">
                    <h2>Info Video</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div className="small-info card-rounded">
                    <h2>Info Video</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </div>
    )
}

export default Company;