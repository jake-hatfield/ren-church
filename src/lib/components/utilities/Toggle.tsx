'use client';

// react
import { useState } from 'react';

// types
interface Props {
	error?: boolean;
	defaultIsChecked?: boolean;
	isLoading?: boolean;
	name: string;
	onChange?: () => void;
}

const Tooltip: React.FC<Props> = ({
	error = false,
	defaultIsChecked = false,
	isLoading = false,
	name,
	onChange,
}) => {
	const [isChecked, setIsChecked] = useState(defaultIsChecked ?? false);

	return (
		<label
			htmlFor={name}
			className='flex w-fit cursor-pointer items-center font-semibold text-white'
			data-testid={`toggle-${name}`}
		>
			<slot name='itemLeft' />
			<div className='relative'>
				<input
					disabled={isLoading}
					id={name}
					type='checkbox'
					checked={isChecked}
					onChange={() => {
						setIsChecked(!isChecked);
						onChange && onChange();
					}}
					className='sr-only'
				/>
				<div
					className={`block h-6 w-12 rounded-full border-2 shadow-sm transition-colors group-hover:shadow ${
						error
							? 'border-red-400 bg-red-300'
							: isChecked
							? 'border-cyan-900 bg-cyan-400'
							: 'border-zinc-700 bg-zinc-800'
					}`}
				/>
				<span
					className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full shadow transition ${
						error
							? 'bg-red-900'
							: isChecked
							? 'translate-x-6 bg-white'
							: 'bg-zinc-300'
					}`}
				/>
			</div>
			<slot name='itemRight' />
		</label>
	);
};

export default Tooltip;
