// react
import { SetStateAction, useEffect, useState } from 'react';

// packages
import { handlePluralization } from '@utils/string';

// types
import type { Dispatch } from 'react';
interface Props {
	error?: string;
	helperText?: string;
	id: string;
	isLabelHidden?: boolean;
	isReadOnly?: boolean;
	isRequired?: boolean;
	label?: string;
	placeholder: string;
	setValue: Dispatch<SetStateAction<string>>;
	value: string;
}

const TextArea: React.FC<Props> = ({
	error,
	helperText,
	id,
	isLabelHidden = false,
	isReadOnly = false,
	isRequired = false,
	label,
	placeholder,
	setValue,
	value,
}) => {
	// state
	const characterLimit = 500;
	const [characterCount, setCharacterCount] = useState(0);

	useEffect(() => {
		setCharacterCount(value.length);
	}, [value]);

	return (
		<>
			{label && (
				<label
					htmlFor={id}
					className={`block font-medium text-zinc-300 ${
						isLabelHidden ? 'sr-only' : ''
					} ${isReadOnly ? 'cursor-not-allowed text-zinc-500' : 'cursor-text'}`}
				>
					label={label}
					{isRequired ? '*' : ''}
				</label>
			)}

			<textarea
				className={`minimal-scrollbar block h-32 w-full border-b-2 bg-zinc-100 py-1.5 px-3 dark:bg-zinc-800 md:py-2 ${
					error
						? 'placeholder:red-300 border-red-300 text-red-400 focus:border-red-500 focus:ring-red-500'
						: isReadOnly
						? 'cursor-not-allowed border-zinc-700 text-zinc-500'
						: 'cursor-text text-zinc-800 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:focus:border-white dark:focus:ring-white'
				} placeholder:zinc-500 text-sm placeholder:text-sm focus:outline-none ${
					label ? 'mt-1.5' : ''
				}`}
				disabled={isReadOnly}
				id={id}
				maxLength={characterLimit}
				name={id}
				placeholder={placeholder}
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
			<div className='mt-1.5 text-left text-xs md:flex md:items-end md:justify-between md:text-sm'>
				{error ? (
					<p className='text-red-400' id={`${id}-error`}>
						{error}
					</p>
				) : isReadOnly ? (
					<p className='text-zinc-500' id={`${id}-read-only`}>
						This field is read-only
					</p>
				) : helperText ? (
					<p className='text-zinc-300' id={`${id}-helper-text`}>
						{helperText}
					</p>
				) : (
					<></>
				)}
				<span className='mt-1.5 inline-block text-zinc-300'>
					{handlePluralization(
						'character',
						characterLimit - characterCount,
						true
					)}{' '}
					left
				</span>
			</div>
		</>
	);
};

export default TextArea;
