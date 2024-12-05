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
import { useParams, useSearchParams } from 'react-router-dom';

const Home = ({refetch}) => {
    const { isTimerFinished } = useContext(TimerContext);
    const [searchParams] = useSearchParams();
  const referredBy = searchParams.get('referred_by')
    console.log(referredBy, "__________")
    
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
