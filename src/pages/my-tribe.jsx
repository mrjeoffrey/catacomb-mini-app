/**
 * Internal dependencies.
 */
import BoxShare from '@/components/box-share/box-share';
import ListAllies from '@/components/list-allies/list-allies';
import useAllies from '@/queries/useAllies';
import SectionMain from '@/components/section-main/section-main';

const MyTribe = ({userInfo}) => {
    const { data, error, isLoading, isError, isSuccess } = useAllies();

    return (
        <SectionMain title="My TRiBe" entry="Build your tribe and earn 10% of their gold">
            <BoxShare code={'Text copied'} userInfo={userInfo} />

            {isSuccess && <ListAllies allies={data} />}
        </SectionMain>
    );
};

export default MyTribe;
