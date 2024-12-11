/**
 * External dependencies.
 */
import { useState } from 'react';
import classNames from 'classnames';

const BoxTask = ({ title, iconSrc }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleTaskClick = (id) => {
        if (isLoading || isComplete) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setIsComplete(true);
        }, 30000);
    };

    return (
        <div
            className={classNames('box-task', { 'is-loading': isLoading, 'is-complete': isComplete })}
            onClick={handleTaskClick}
        >
            <figure className="box__image">
                <img src={iconSrc?iconSrc:null} width="40" height="40" alt="" />
            </figure>

            <div className="box__content">
                <h6>{title}</h6>

                <ul>
                    <li>
                        <img src="/images/svg/ico-coin.svg" width="16" height="16" alt="" />
                        200
                    </li>

                    <li>
                        <img src="/images/svg/ico-xp.svg" width="30" height="16" alt="" />
                        1000
                    </li>
                </ul>
            </div>

            <div className="box__loader">
                {isLoading && (
                    <img className="box__loader-icon" src="/images/svg/ico-loader.svg" width="28" height="28" alt="" />
                )}

                {isComplete && <span className="box__checkmark"></span>}
            </div>
        </div>
    );
};

export default BoxTask;
