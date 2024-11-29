/**
 * Internal dependencies.
 */
import Shell from '@/components/shell/shell';

const SectionMain = ({title, subtitle, entry, children }) => {
    return (
        <section className="section-main">
            <Shell>
                <div className="section__head">
                    <div className="section__title-wrapper">
                        <figure className="section__title-decoration">
                            <img src="/images/temp/decoration2@2x.png" width="262" height="94" alt="" />
                        </figure>

                        <h4 className="section__title">{title}</h4>
                    </div>

                    <h5 className="section__subtitle">
                        {subtitle}

                        <span className="text-xs text-medium">{entry}</span>
                    </h5>
				</div>
				
				{children}
				
            </Shell>
        </section>
    );
};

export default SectionMain;
