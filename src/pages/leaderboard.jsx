/**
 * Internal dependencies.
 */
import BoxLeaderboard from '@/components/box-leaderboard/box-leaderboard';
import usePlayers from '@/queries/usePlayers';
import SectionMain from '@/components/section-main/section-main';

const Leaderboard = () => {
    const { data, error, isLoading, isError, isSuccess } = usePlayers();

    return (
        <SectionMain
            title="LeadeRboArD"
            subtitle="Season 1"
            entry="1 December until 31 December 2024"
        >
            {isSuccess && <BoxLeaderboard players={data} />}
        </SectionMain>
    );
};

export default Leaderboard;
