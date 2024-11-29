/**
 * Internal dependencies.
 */
import Wrapper from '@/components/wrapper/wrapper';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

const Layout = ({ children }) => {
    return (
        <Wrapper>
            <Header />
                {children}
            <Footer />
        </Wrapper>
    );
};

export default Layout;
