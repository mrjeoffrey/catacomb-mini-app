const BoxShare = ({ code }) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(code);
	};

    return (
        <div className="box-share">
            <div className="box__title">
                <h6>
                    Invite your friends
                    <span className="text-xs text-medium">You have 234 friends in your tribe</span>
                </h6>
            </div>

            <ul>
                <li>
                    <button>
                        <img src="/images/svg/ico-share.svg" width="30" height="30" alt="" />
                    </button>
                </li>

                <li>
                    <button onClick={copyToClipboard}>
                        <img src="/images/svg/ico-copy.svg" width="26" height="30" alt="" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default BoxShare;
