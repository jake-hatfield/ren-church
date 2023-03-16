'use client';

// react
import { useState } from 'react';

// types
interface Props {
	classes?: string;
	defaultIsChecked: boolean;
	id: string;
	name: string;
	onClick?: () => void;
}

const Checkbox: React.FC<Props> = ({
	classes,
	defaultIsChecked = false,
	id,
	name,
	onClick,
}) => {
	// state
	const [isChecked, setIsChecked] = useState(defaultIsChecked);

	return (
		<input
			className={`h-4 w-4 border-zinc-200 bg-zinc-200 text-cyan-500 focus:outline-none focus:ring-cyan-400 dark:border-zinc-700 dark:bg-zinc-700 ${
				classes ? classes : ''
			}`}
			checked={isChecked}
			id={id}
			name={name}
			onChange={() => {
				setIsChecked((prev) => !prev);
				onClick && onClick();
			}}
			type='checkbox'
		/>
	);
};

export default Checkbox;
