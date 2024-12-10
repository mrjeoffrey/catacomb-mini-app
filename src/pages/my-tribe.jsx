/**
 * Internal dependencies.
 */
import BoxShare from '@/components/box-share/box-share';
import ListAllies from '@/components/list-allies/list-allies';
import SectionMain from '@/components/section-main/section-main';

const MyTribe = ({userInfo}) => {

    return (
        <SectionMain title="My TRiBe" entry="Build your tribe and earn 10% of their gold">
            <BoxShare code={'Text copied'} userInfo={userInfo} />
<ListAllies userInfo={userInfo} />
        </SectionMain>
    );
};

export default MyTribe;
