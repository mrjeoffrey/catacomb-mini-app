import { createContext, useEffect, useState } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ initialSeconds, time_remaining, children, gold }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    gold === 0? 0 :
    (time_remaining === undefined ? initialSeconds: time_remaining));
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  // Reset Timer Function
  const resetTimer = () => {
    setTimeRemaining(initialSeconds); // Reset to initialSeconds
    setIsTimerFinished(false);
  };

  // Timer Logic
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval
    }

    if (timeRemaining <= 0) {
      setIsTimerFinished(true);
    }
  }, [timeRemaining, isTimerFinished]); // Depend on the correct states

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

export { TimerContext };
