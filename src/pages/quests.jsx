import SectionMain from '@/components/section-main/section-main';
import BoxesList from '@/components/boxes-list/boxes-list';
import { LoadingPanel } from '@/components/loading/loading';
import { useGetTasks } from '../queries/useTasks';

const Leaderboard = () => {
    const { data: tasks, isLoading } = useGetTasks();

    return (
        <SectionMain title="QueStS" entry="Complete tasks to earn more gold">
            {!isLoading?
            <BoxesList items={tasks} />:<LoadingPanel/>}
        </SectionMain>
    );
};

export default Leaderboard;
