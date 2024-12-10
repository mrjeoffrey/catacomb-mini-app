/**
 * Internal dependencies.
 */
import AllyItem from '@/components/list-allies/ally-item';

const ListAllies = ({ userInfo }) => (
    <div className="list-allies">
        <h5 className="text-extrabold">Your Tribe’s Newest Allies</h5>

        <ul>
            {userInfo?.valid_referrals?.map((ally) => (
                <AllyItem key={ally.username} ally={ally} />
            ))}
        </ul>
    </div>
);

export default ListAllies;
