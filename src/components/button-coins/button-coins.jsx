import { NavLink } from "react-router-dom";

const ButtonCoins = ({userInfo}) => {
	return (
		<button className="button-coins" >
            <img className="button__icon-left" src="/images/svg/ico-coin.svg" width="46" height="46" alt="" />
            <span>{userInfo?.gold}</span>
            <NavLink to="/quests">
            <img className="button__icon-right" src="/images/svg/ico-plus.svg" width="20" height="20" alt="" />
            </NavLink>
        </button>
    );
};

export default ButtonCoins;
