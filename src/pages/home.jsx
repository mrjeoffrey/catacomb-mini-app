/**
 * External dependencies.
 */
import { useContext } from 'react';

/**
 * Internal dependencies.
 */
import { TimerContext } from '@/contexts/timer-context';
import Section from '@/components/section/section';
import Shell from '@/components/shell/shell';
import Timer from '@/components/timer/timer';
import Progress from '@/components/progress/progress';
import Chest from '@/components/chest/chest';

const Home = ({refetch}) => {
    const { isTimerFinished } = useContext(TimerContext);

    return (
        <Section isTimerFinished={isTimerFinished}>
            <Shell>
                <Section.Decoration>
                    <img src="/images/temp/decoration@2x.png" width="378" height="45" alt="" />
                </Section.Decoration>

                <Section.Content>
                    <Chest refetch={refetch} />

                    <Progress />

                    <Timer />
                </Section.Content>
            </Shell>
        </Section>
    );
};

export default Home;
