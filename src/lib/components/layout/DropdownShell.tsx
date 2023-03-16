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
			} mt-5 border-2 border-t-4 border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 ${
				classes ? classes : ''
			}`}
		>
			{children}
		</nav>
	);
};

export default DropdownShell;
