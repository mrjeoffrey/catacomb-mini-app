/**
 * Internal dependencies.
 */
import BoxTask from '@/components/box-task/box-task';

const BoxesList = ({items, userInfo}) => {
	return (
		<div className="boxes-list">
			{items?.map((item) => (
				<BoxTask
					key={item._id}
					item={item}
					userInfo={userInfo}
				/>
			))}
		</div>
	)
}

export default BoxesList;