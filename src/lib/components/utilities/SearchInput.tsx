'use client';

// react
import { useEffect, useRef, useState } from 'react';

// packages
import { useHotkeys } from 'react-hotkeys-hook';

// lib
import { getOs } from '@utils/analytic';

// icons
import { Search } from '@carbon/icons-react';

// types
import type { Dispatch, SetStateAction } from 'react';
interface Props {
	hasEnter?: boolean;
	onClick?: () => {};
	placeholder?: string;
	setQuery: Dispatch<SetStateAction<string>>;
	query: string;
}

const SearchInput: React.FC<Props> = ({
	hasEnter = false,
	onClick,
	placeholder = 'Enter a search...',
	setQuery,
	query,
}) => {
	// state
	const [os, setOs] = useState<string | null>(null);

	const ref = useRef(null);

	// hotkeys
	useHotkeys('Escape', () => clearQuery(), { keyup: true }, [query]);
	useHotkeys('ctrl+k', (e) => focus(e), { keyup: true }, [query]);

	// functions
	const clearQuery = () => {
		setQuery('');
	};

	const focus = (e: any) => {
		e.preventDefault();
		ref.current?.focus();
	};

	useEffect(() => {
		setOs(getOs());
	}, []);

	return (
		<div className='relative'>
			<span className='absolute inset-y-0 left-0 px-3 pb-2 pt-2.5'>
				<Search className='flex-none text-gray-500' size={20} />
			</span>
			<input
				className='mono block w-full cursor-text border-b-2 border-gray-300 bg-gray-100 py-2 pl-10 pr-2 text-gray-800 outline-none placeholder:text-xs placeholder:text-gray-500 focus:border-gray-900 focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-white sm:text-sm md:pr-10 md:placeholder:text-sm'
				data-testid='search-input'
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholder}
				ref={ref}
				type='text'
				value={query}
			/>
			<div className='absolute right-3 top-2.5 hidden md:flex md:items-center'>
				<span className='w-min-content flex h-5 items-center justify-center bg-gray-200 px-1 py-0.5 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-white'>
					{query ? (
						<button
							onClick={() => clearQuery()}
							className='font-semibold'
							data-testid='esc-button'
						>
							Esc
						</button>
					) : (
						<button
							className='font-semibold'
							data-testid='focus-button'
							onClick={(e) => focus(e)}
						>
							{os === 'macOs' ? '⌘' : 'Ctrl'} + k
						</button>
					)}
				</span>
				{query && hasEnter && (
					<span className='w-min-content ml-0.5 flex h-5 items-center justify-center bg-green-300 px-1 py-0.5 text-xs font-semibold text-green-900'>
						<button
							className='font-semibold'
							data-testid='focus-button'
							onClick={(e) => {
								e.preventDefault();
								onClick && onClick();
							}}
						>
							Enter
						</button>
					</span>
				)}
			</div>
		</div>
	);
};

export default SearchInput;
