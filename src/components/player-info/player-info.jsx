import { NavLink } from "react-router-dom";

const PlayerInfo = ({userInfo}) => {
    return (
        <div className="player-info">
            <div className="player__aside">
                <img src="/images/svg/ico-level.svg" width="88" height="80" alt="" />

                <span className="player__level">LV{userInfo?.level}</span>

                <NavLink to="/quests"  className="player__xp">
                    <img  src="/images/svg/ico-xp.svg" width="45" height="22" alt="" />
                </NavLink>
            </div>
            <div className="player__content">
				<p className="text-extrabold">Player
					<span className="text-medium">@{userInfo?.username}
                    	<img className="player__status" src="/images/svg/ico-dot.svg" width="10" height="10" alt="" />
					</span>
				</p>

                <p className="text-xxs text-gray-100">{userInfo?.xp} XP / {userInfo?.season_xp} XP #{userInfo?.rank}</p>
            </div>
        </div>
    );
};

export default PlayerInfo;
