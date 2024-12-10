const AllyItem = ({ ally }) => {
    const DateDisplay = ({ date }) => {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
          return <span>Invalid Date</span>;
        }
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit',
        }).format(parsedDate);
        return <span>{formattedDate}</span>;
      };

    return (
        <li>
			<p>@{ally.username}</p>
			<p><DateDisplay date={ally?.time_added}/></p>
            <p>
                <img src="/images/svg/ico-xp.svg" width="29" height="14" alt="XP" />
                100
            </p>
        </li>
    );
};

export default AllyItem;