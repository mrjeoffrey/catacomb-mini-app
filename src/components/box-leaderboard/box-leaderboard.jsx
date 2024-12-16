/**
 * Internal dependencies.
 */
import BoxRow from '@/components/box-leaderboard/box-row';

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

            <p className="text-xs">Your current rank is ${userInfo?.rank} for this season.</p>
        </div>
    );
};

export default BoxLeaderboard;
