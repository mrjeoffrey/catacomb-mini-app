/**
 * Internal dependencies.
 */
import SectionDecoration from '@/components/section/section-decoration';
import SectionContent from '@/components/section/section-content';

const Section = ({ isTimerFinished, children }) => {
    return (
        <section className={`section ${isTimerFinished ? 'timer-finished' : ''}`}>
			{children}
        </section>
    );
};

Section.Decoration = SectionDecoration;
Section.Content = SectionContent;

export default Section;
