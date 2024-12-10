/**
 * External dependencies.
 */
import { NavLink, Link, useLocation } from 'react-router-dom';

const Nav = ({userInfo}) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const showLinkOnPaths = ['/'];

    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to="/my-tribe" className="nav-link">
                        <div className="nav__icon">
                            <img src="/images/svg/ico-tribe.svg" width="55" height="39" alt="" />
                        </div>

                        <p className="text-semibold">
                            My Tribe
                            <span className="text-gray-100 text-xxs">{userInfo?.valid_referrals?.length} teamates</span>
                        </p>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/quests" className="nav-link">
                        <div className="nav__icon">
                            <img src="/images/svg/ico-quests.svg" width="55" height="39" alt="" />

                                <img
                                    className="nav__icon-available"
                                    src="/images/svg/ico-bolt.svg"
                                    width="23"
                                    height="27"
                                    alt=""
                                />
                        </div>

                        <p className="text-semibold">
                            Quests
                            <span className="text-gray-100 text-xxs">2 available</span>
                        </p>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/leaderboard" className="nav-link">
                        <div className="nav__icon">
                            <img src="/images/svg/ico-ranks.svg" width="55" height="39" alt="" />
                        </div>

                        <p className="text-semibold">
                            Ranks
                            <span className="text-gray-100 text-xxs">#4567</span>
                        </p>
                    </NavLink>
                </li>
            </ul>

            {showLinkOnPaths.includes(currentPath) && (
                <Link to="#" className="nav__back">
                    <img src="/images/svg/ico-arrow.svg" width="55" height="" alt="55" />
                </Link>
            )}
        </nav>
    );
};

export default Nav;
