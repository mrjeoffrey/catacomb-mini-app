/**
 * External dependencies.
 */
import { useState, useContext, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/**
 * Internal dependencies.
 */
import { TimerContext } from '@/contexts/timer-context';
import animationData from '@/assets/animation.lottie';

const Chest = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRewardVisible, setIsRewardVisible] = useState(false);
    const { resetTimer, isTimerFinished } = useContext(TimerContext);
    const [dotLottie, setDotLottie] = useState(null);
    const timeouts = useRef([]);

    const dotLottieRefCallback = (dotLottie) => {
        setDotLottie(dotLottie);
    };

    const handleChestClick = () => {
        setIsOpen(true);

        const rewardTimeout =  setTimeout(() => {
            setIsRewardVisible(true);

            if (dotLottie) {
                dotLottie.stop();
                dotLottie.play();
            }
        }, 1600);

        const resetTimeout =  setTimeout(() => {
            setIsOpen(false);
            setIsRewardVisible(false);
            resetTimer();
        }, 6600);

        timeouts.current.push(rewardTimeout, resetTimeout);
    };

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    return (
        <div className={classNames("chest", {"is-open": isOpen,"has-reward": isRewardVisible,})}>
            <div className="chest__main" onClick={handleChestClick}>
                <div className="chest__image"></div>

                {isTimerFinished && (
                    <figure className="chest__pointer">
                        <img src="/images/svg/ico-pointer.svg" width="42" height="65" alt="" />
                    </figure>
                )}

                <div className="chest__rewards">
                    <DotLottieReact
                        className="chest__rewards-animation"
                        src={animationData}
                        dotLottieRefCallback={dotLottieRefCallback}
                    />

                    <div className="chest__rewards-row">
                        <img src="/images/svg/ico-coin.svg" width="28" height="28"  alt="" />

                        <h3 className="text-extrabold">100</h3>
                    </div>

                    <div className="chest__rewards-row">
                        <span className="text-xs">50</span>

                        <img src="/images/svg/ico-xp.svg"  width="28"  height="28" alt=""/>
                    </div>
                </div>
            </div>

            {!isTimerFinished && (
                <figure className="chest__loader">
                    <img src="images/svg/sand-timer.svg" width="48"  height="62" alt="" />
                </figure>
            )}
        </div>
    );
};

export default Chest;