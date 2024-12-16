/**
 * Internal dependencies.
 */
import BoxRow from '@/components/box-leaderboard/box-row';

const getOrdinalSuffix = (rank) => {
    const j = rank % 10;
    const k = rank % 100;
    if (j === 1 && k !== 11) {
        return `${rank}st`;
    }
    if (j === 2 && k !== 12) {
        return `${rank}nd`;
    }
    if (j === 3 && k !== 13) {
        return `${rank}rd`;
    }
    return `${rank}th`;
};

const BoxLeaderboard = ({ userInfo }) => {
    return (
        <div className="box-leaderboard">
            {userInfo?.rankings?.map((player, index) => (
                <BoxRow
                    key={player.username}
                    player={player}
                    rank={index}
                />
            ))}

            <p className="text-xs">
                Your current rank is {getOrdinalSuffix(userInfo?.rank)} for this season.
            </p>
        </div>
    );
};

export default BoxLeaderboard;
