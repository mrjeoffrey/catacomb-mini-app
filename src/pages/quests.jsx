import SectionMain from '@/components/section-main/section-main';
import BoxesList from '@/components/boxes-list/boxes-list';
import { LoadingPanel } from '@/components/loading/loading';

const Leaderboard = ({userInfo, refetch, tasks, isLoading}) => {
  

    return (
        <SectionMain title="QueStS" entry="Complete tasks to earn more gold">
            {!isLoading?
            <BoxesList items={tasks} userInfo={userInfo} refetch={refetch}/>:<LoadingPanel/>}
        </SectionMain>
    );
};

export default Leaderboard;
