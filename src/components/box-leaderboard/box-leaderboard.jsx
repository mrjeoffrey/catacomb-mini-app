/**
 * Internal dependencies.
 */
import BoxRow from '@/components/box-leaderboard/box-row';

const BoxLeaderboard = ({ players }) => {
    const sortedPlayers = players.sort((a, b) => a.value - b.value);

    return (
        <div className="box-leaderboard">
            {sortedPlayers?.map((player, index) => (
                <BoxRow
                    key={player.username}
                    player={player}
                    rank={index}
                />
            ))}

            <p className="text-xs">Your current rank is #4463 for this season.</p>
        </div>
    );
};

export default BoxLeaderboard;
