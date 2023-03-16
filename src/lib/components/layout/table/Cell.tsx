// types
interface Props {
	children: React.ReactNode;
	classes?: string;
	kind: 'body' | 'header';
	onClick?: () => {};
	size: 'sm' | 'md';
}

const Cell: React.FC<Props> = ({ children, classes, kind, onClick, size }) => {
	const commonLayoutClasses = `text-left`;

	return kind === 'body' ? (
		<td
			className={`${
				size === 'sm' ? 'py-1.5 px-2' : 'p-3'
			} ${commonLayoutClasses} ${classes ? classes : ''}`}
		>
			{children}
		</td>
	) : (
		<th
			className={`${commonLayoutClasses} ${classes ? classes : ''}`}
			onClick={() => onClick && onClick()}
			role='columnheader'
			scope='col'
		>
			{children}
		</th>
	);
};

export default Cell;
