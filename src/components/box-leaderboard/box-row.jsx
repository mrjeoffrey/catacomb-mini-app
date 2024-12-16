const BoxRow = ({ player, rank }) => (
    <div className="box__row">
        <div className="box__rank">
            {rank === 0 ? (
                <img src="/images/svg/ico-top1.svg" width="43" height="43" alt="" />
            ) : (
                <span className={rank <= 2 ? 'text-white' : ''}>{rank}</span>
            )}
        </div>

        <div className="box__info">
            <p>
                {player.username}

                <span className="text-gray-100 text-xxs">{player.season_xp} XP</span>
            </p>
        </div>

        <div className="box__aside">
            <p className="text-semibold">{player.season_gold}</p>

            <img src="/images/svg/ico-coin.svg" width="22" height="22" alt="" />
        </div>
    </div>
);

export default BoxRow;
