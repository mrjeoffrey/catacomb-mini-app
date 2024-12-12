/**
 * Internal dependencies.
 */
import BoxTask from '@/components/box-task/box-task';

const BoxesList = ({items, userInfo, refetch}) => {
	return (
		<div className="boxes-list">
			{items?.map((item) => (
				<BoxTask
				refetch={refetch}
					key={item._id}
					item={item}
					userInfo={userInfo}
				/>
			))}
		</div>
	)
}

export default BoxesList;