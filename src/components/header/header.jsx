/**
 * External dependencies.
 */
import { Link, useLocation } from "react-router-dom";

/**
 * Internal dependencies.
 */
import Shell from '@/components/shell/shell';
import ButtonCoins from '@/components/button-coins/button-coins';
import PlayerInfo from '@/components/player-info/player-info';

const Header = () => {
	const location = useLocation();
	const isHomePage = location.pathname === "/"; 

    return (
		<header className="header">
			<Shell>
				<div className="header__inner">
					<Link to="/" className="header__logo">
						<img src="/images/temp/logo@2x.png" width="153" height="38" alt="Logo" />						
					</Link>

					<ButtonCoins />
				</div>

				<div className="header__info">
					<PlayerInfo />

					{!isHomePage && (
						<Link to="/" className="header__back">
							<img src="/images/svg/ico-arrow.svg" width="55" height="" alt="55" />
						</Link>
					)}
				</div>

			</Shell>
        </header>
    );
};

export default Header;
