/**
 * External dependencies.
 */
import { createContext, useState, useRef, useEffect, useCallback } from "react";

const TimerContext = createContext();

const TimerProvider = ({ children, initialSeconds = 40 }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
    const [isTimerFinished, setIsTimerFinished] = useState(false);

    const lastTimeRef = useRef(Date.now());
    const intervalRef = useRef(null);

    const resetTimer = useCallback(() => {
        if (intervalRef.current) {
            cancelAnimationFrame(intervalRef.current);
        }
        
        setTimeRemaining(initialSeconds);
        setIsTimerFinished(false);
        
        setTimeout(() => {
            lastTimeRef.current = Date.now();
            startTimer();
        }, 1000);
    });

    const startTimer = () => {
        const updateTimer = () => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTimeRef.current;

            if (deltaTime >= 1000) {
                lastTimeRef.current += 1000;
                
                setTimeRemaining((prevTimer) => {
                    if (prevTimer > 1) {
                        return prevTimer - 1;
                    }

                    setIsTimerFinished(true);
                    cancelAnimationFrame(intervalRef.current);
                    return 0;
                });
            }
            intervalRef.current = requestAnimationFrame(updateTimer);
        };

        intervalRef.current = requestAnimationFrame(updateTimer);
    };

    useEffect(() => {
        startTimer();

        return () => {
            if (intervalRef.current) {
                cancelAnimationFrame(intervalRef.current);
            }
        };
    }, []);

    return (
        <TimerContext.Provider
            value={{
                timeRemaining,
                setTimeRemaining,
                initialSeconds,
                isTimerFinished,
                setIsTimerFinished,
                resetTimer,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export { TimerContext, TimerProvider };
