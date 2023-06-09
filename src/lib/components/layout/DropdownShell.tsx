// types
interface Props {
	children: React.ReactNode;
	classes?: string;
	position: 'left' | 'right';
}

const DropdownShell: React.FC<Props> = ({
	children,
	classes,
	position = 'left',
}) => {
	return (
		<nav
			className={`card-shadow absolute z-30 ${
				position === 'right' ? 'right-0' : 'left-0'
			} mt-5 border-2 border-t-4 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 ${
				classes ? classes : ''
			}`}
		>
			{children}
		</nav>
	);
};

export default DropdownShell;
