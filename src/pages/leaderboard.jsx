/**
 * Internal dependencies.
 */
import BoxLeaderboard from '@/components/box-leaderboard/box-leaderboard';
import SectionMain from '@/components/section-main/section-main';

const Leaderboard = ({userInfo}) => {
    return (
        <SectionMain
            title="LeadeRboArD"
            subtitle="Season 1"
            entry="1 December until 31 December 2024"
        >
            <BoxLeaderboard userInfo={userInfo} />
        </SectionMain>
    );
};

export default Leaderboard;
