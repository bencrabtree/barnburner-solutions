import React from 'react';
import Particles from 'react-particles-js';

const ParticleBackground = () => {
    return (
        <Particles
            params={{
                "particles": {
                    "number": {
                        "value": 100
                    },
                    "size": {
                        "value": 3
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                      "onhover": {
                        "enable": true,
                        "mode": "grab"
                      },
                      "onclick": {
                        "enable": true,
                        "mode": "push"
                      },
                      "resize": true
                    }
                }
            }}
            style={{
                "position": "absolute"
            }}
        />
    )
}

export default ParticleBackground;