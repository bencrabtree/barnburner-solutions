import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './progress-stepper.scss';

const ProgressStepper = ({
    steps,
    currentStep,
    onStepClick
}) => {
    const [ selectedStep, setSelectedStep ] = useState(currentStep);

    useEffect(() => {
        setSelectedStep(currentStep);
    }, [ currentStep ]);

    const generateSteps = () => {
        return steps.map((step, key) => {
            const activeIdx = steps.findIndex(x => x.id === selectedStep);
            let status = activeIdx === key ? 'active' : activeIdx > key ? 'complete' : 'todo';

            return (
                <div className={`step ${status}`} key={key} onClick={() => onStepClick(step)}>
                    <h1>{ step.label }</h1>
                </div>
            )
        })
    }
    
    return (
        <div className='progress-stepper'>
            { generateSteps() }
        </div>
    )
}

ProgressStepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    currentStep: PropTypes.string.isRequired
}

export default ProgressStepper;