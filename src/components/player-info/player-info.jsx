const PlayerInfo = () => {
    return (
        <div className="player-info">
            <div className="player__aside">
                <img src="/images/svg/ico-level.svg" width="88" height="80" alt="" />

                <span className="player__level">LV2</span>

                <button className="player__xp">
                    <img  src="/images/svg/ico-xp.svg" width="45" height="22" alt="" />
                </button>
            </div>

            <div className="player__content">
				<p className="text-extrabold">Player
					<span className="text-medium">@robnguyen9

                    	<img className="player__status" src="/images/svg/ico-dot.svg" width="10" height="10" alt="" />
					</span>
				</p>

                <p className="text-xxs text-gray-100">103060 XP / 45670 XP #2356</p>
            </div>
        </div>
    );
};

export default PlayerInfo;