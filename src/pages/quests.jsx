/**
 * Internal dependencies.
 */
import SectionMain from '@/components/section-main/section-main';
import BoxesList from '@/components/boxes-list/boxes-list';
import { LoadingPanel } from '@/components/loading/loading';
import { useGetTasks } from '../queries/useTasks';

const Leaderboard = () => {
    // const tasks = [
    //     { id: 1, title: 'Join our Telegram group', iconSrc: '/images/svg/telegram.svg' },
    //     { id: 2, title: 'Subscribe to our channel', iconSrc: '/images/svg/telegram.svg' },
    //     { id: 3, title: 'Follow our X page', iconSrc: '/images/svg/x.svg' },
    //     { id: 4, title: 'Follow our Instagram', iconSrc: '/images/svg/instagram.svg' },
    // ];
    const { data: tasks, isLoading } = useGetTasks();

    return (
        <SectionMain title="QueStS" entry="Complete tasks to earn more gold">
         <LoadingPanel/>
        </SectionMain>
    );
};

export default Leaderboard;
