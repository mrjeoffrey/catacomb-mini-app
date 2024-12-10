/**
 * Internal dependencies.
 */
import Wrapper from '@/components/wrapper/wrapper';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

const Layout = (data) => {
   
    return (
        <Wrapper>
            <Header userInfo={data?.userInfo}/>
                {data?.children}
            <Footer userInfo={data?.userInfo}/>
        </Wrapper>
    );
};

export default Layout;
