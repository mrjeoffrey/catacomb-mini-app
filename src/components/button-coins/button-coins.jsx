const ButtonCoins = ({userInfo}) => {
	return (
		<button type="button" className="button-coins">
            <img className="button__icon-left" src="/images/svg/ico-coin.svg" width="46" height="46" alt="" />
            <span>{userInfo?.gold}</span>
            <img className="button__icon-right" src="/images/svg/ico-plus.svg" width="20" height="20" alt="" />
        </button>
    );
};

export default ButtonCoins;
