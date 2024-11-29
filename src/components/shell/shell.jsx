import classNames from 'classnames';

const Shell = ({ children, className }) => {
	return <div className={classNames("shell", className)}>{children}</div>;
}

export default Shell;