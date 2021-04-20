import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types';
import heartIcon from '../../assets/images/heart-filled.svg';
import './heart-icon.scss';

const HeartIcon = ({
    isLiked,
    disabled,
    onClick
}) => {
    const [ liked, setLiked ] = useState(isLiked)
    const { x } = useSpring({ from: { x: 0 }, x: liked ? 1 : 0, config: { duration: 1000 } });

    useEffect(() => {
        setLiked(isLiked)
    }, [ isLiked ]);

    const handleClick = () => {
        if (!disabled) {
            setLiked(!liked);
            onClick();
        }
    }

    return (
        <div className="heart-icon" onClick={handleClick}>
            <animated.div
                style={{
                    opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
                    transform: x
                    .interpolate({
                        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                        output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                    })
                    .interpolate(x => `scale(${x})`)
                }}>
                <img src={ heartIcon } />
            </animated.div>
        </div>
    )
}

HeartIcon.defaultProps = {
    disabled: false
}

export default HeartIcon;