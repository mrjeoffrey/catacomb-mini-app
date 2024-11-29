/**
 * External dependencies.
 */
import { useContext } from 'react';
import { TimerContext } from '@/contexts/timer-context';

const Progress = () => {
    const { timeRemaining, initialSeconds } = useContext(TimerContext);
    const progress = ((initialSeconds - timeRemaining) / initialSeconds) * 100;

    return (
        <div className="progress" style={{ '--bar-width': `${progress}%` }}>
            <img
                className="progress__background"
                src="/images/svg/progress-wrapper.svg"
                width="284"
                height="38"
                alt=""
            />

            <span className="progress__bar-wrapper">
                <span className="progress__bar"></span>
            </span>

            <img className="progress__key" src="/images/temp/ico-key@2x.png" width="48" height="57" alt="" />
        </div>
    );
};

export default Progress;
