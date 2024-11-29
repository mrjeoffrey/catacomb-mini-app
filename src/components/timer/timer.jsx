/**
 * External dependencies.
 */
import { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { TimerContext } from '@/contexts/timer-context';

const Timer = () => {
    const { timeRemaining, isTimerFinished } = useContext(TimerContext);
    
    return (
        <div className="timer">
            <p className="text-semibold">
                {!isTimerFinished && <span>{timeRemaining} seconds left</span>}
             
                {isTimerFinished && <span>Open your chest</span>}
                
                <span className="text-xs text-medium">Unlock the chest and receive your reward.</span>
            </p>
        </div>
    );
};

export default Timer;
