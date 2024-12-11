/**
 * Internal dependencies.
 */
import BoxTask from '@/components/box-task/box-task';

const BoxesList = (items) => {
	return (
		<div className="boxes-list">
			{items?.map((item) => (
				<BoxTask
					key={item._id}
					id={item._id}
					title={item.name}
					iconSrc={`${import.meta.env.VITE_BACKEND_URL}${item?.avatar_url}`}
				/>
			))}
		</div>
	)
}

export default BoxesList;