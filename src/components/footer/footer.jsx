/**
 * External dependencies.
 */
import { useLocation } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import Shell from '@/components/shell/shell';
import Box from '@/components/box/box';
import Nav from '@/components/nav/nav';

const Footer = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const showBoxOnPaths = ['/'];

    return (
        <footer className="footer">
            <Shell>
                <div className="footer__nav">
                    <Nav />
                </div>

                {showBoxOnPaths.includes(currentPath) && (
                    <Box imageSrc="/images/svg/ico-i.svg" title="How does this work?">
                        <p>
                            At Catacomb Play, you can team up with friends to complete exciting tasks, earn gold coins,
                            and climb the leaderboard for a chance to win monthly cash prizes!
                        </p>

                        <p>
                            The gold coins you collect will soon be exchangeable for CATA tokens, adding even more value
                            to your efforts.
                        </p>

                        <p>
                            And this is just the beginning—over time, we’ll be rolling out new features, including a
                            thrilling mini-game to help you earn even more gold. Don’t miss out on the adventure!
                        </p>
                    </Box>
                )}
            </Shell>
        </footer>
    );
};

export default Footer;
