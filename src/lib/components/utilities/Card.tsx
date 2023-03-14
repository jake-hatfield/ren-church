'use client';

// react
import { useState } from 'react';

// components
import Button from '@components/utilities/Button';

// icons
import { Add, Subtract } from '@carbon/icons-react';

// types
interface Props {
	children: React.ReactNode;
	isExpandable?: boolean;
	isPrimary?: boolean;
	title: string;
}

const Card: React.FC<Props> = ({
	children,
	isExpandable = false,
	isPrimary = false,
	title,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<li
			className={`${
				isPrimary
					? 'card-shadow-primary border-cyan-500'
					: 'card-shadow border-zinc-200 dark:border-zinc-700'
			} transform list-none border-2 border-t-4 bg-white p-3 dark:bg-zinc-900 md:p-5`}
		>
			<header
				className={
					isExpandable ? 'flex items-start justify-between md:items-center' : ''
				}
			>
				<h3
					className={`${
						isExpandable ? 'mt-1.5 md:mt-0' : ''
					} text-base font-black leading-6 text-zinc-900 dark:text-white lg:text-lg`}
				>
					{title}
				</h3>
				{isExpandable && (
					<Button
						className='ml-3'
						kind='ghost'
						onClick={() => setIsExpanded((prev) => !prev)}
						title={isExpanded ? 'Collapse' : 'Expand'}
						tooltipAlignment='end'
						type='icon'
					>
						{isExpanded ? <Subtract /> : <Add />}
					</Button>
				)}
			</header>
			{(!isExpandable || isExpanded) && (
				<div className='mt-3 text-base text-zinc-700 dark:text-zinc-200'>
					{children}
				</div>
			)}
		</li>
	);
};

export default Card;
