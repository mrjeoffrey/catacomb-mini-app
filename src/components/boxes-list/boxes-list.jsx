/**
 * Internal dependencies.
 */
import BoxTask from '@/components/box-task/box-task';

const BoxesList = ({ items }) => {
	return (
		<div className="boxes-list">
			{items.map((item) => (
				<BoxTask
					key={item.id}
					id={item.id}
					title={item.title}
					iconSrc={item.iconSrc}
				/>
			))}
		</div>
	)
}

export default BoxesList;