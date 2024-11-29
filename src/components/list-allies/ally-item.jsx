const AllyItem = ({ ally }) => {
    return (
        <li>
			<p>@{ally.username}</p>
			
			<p>{ally.date}</p>
			
            <p>
                <img src="/images/svg/ico-xp.svg" width="29" height="14" alt="XP" />
                {ally.xp}
            </p>
        </li>
    );
};

export default AllyItem;