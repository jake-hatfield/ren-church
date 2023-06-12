'use client';

// react
import { useEffect, useState } from 'react';

// next
import Link from 'next/link';

// components
import Spinner from '@components/utilities/Spinner';
import Tooltip from '@components/utilities/Tooltip';

// types
interface Props {
	href?: string;
	icon?: React.ReactNode;
	classes?: string;
	isCentered?: boolean;
	isDisabled?: boolean;
	isFullWidth?: boolean;
	isLoading?: boolean;
	isSelected?: boolean;
	kind?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
	onClick?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	selectedClasses?: string;
	size?: 'lg' | 'md' | 'sm';
	spaceIconBetween?: boolean;
	title: string;
	tooltipAlignment?: 'start' | 'end' | 'center';
	tooltipPosition?: 'top' | 'bottom';
	type?: 'icon' | 'full';
}

const Button: React.FC<Props> = (props) => {
	// props
	const {
		href = '',
		icon,
		classes,
		isCentered = false,
		isDisabled = false,
		isFullWidth = false,
		isLoading = false,
		isSelected = false,
		kind = 'primary',
		onClick = () => {},
		onMouseEnter = () => {},
		onMouseLeave = () => {},
		selectedClasses = 'header-link-active',
		size = 'md',
		spaceIconBetween = false,
		title,
		tooltipAlignment = 'center',
		tooltipPosition = 'bottom',
		type = 'full',
	} = props;

	// state
	const [isInactive, setIsInactive] = useState(false);
	const [isTooltipActive, setIsTooltipActive] = useState(false);

	useEffect(() => {
		if (isDisabled || isLoading) setIsInactive(true);
	}, [isDisabled, isLoading]);

	const commonLayoutClasses = `flex items-center ${
		isCentered || type === 'icon'
			? 'justify-center'
			: spaceIconBetween
			? 'justify-between'
			: 'justify-center md:justify-start'
	} ${isFullWidth === true ? 'w-full' : 'w-fit'} ${
		size === 'sm'
			? 'py-1 px-1.5'
			: size === 'md'
			? type === 'icon'
				? 'py-[11px] px-3'
				: 'py-2.5 px-3'
			: size === 'lg'
			? 'p-3'
			: 'pt-[9px] pb-[9px] px-3 border-b border-transparent'
	}`;
	const commonTypographyClasses = `${
		size === 'lg' ? 'text-base' : 'text-sm'
	} tracking-wide font-semibold`;
	const commonStyleClasses = `${
		kind === 'primary'
			? 'bg-rose-900 dark:bg-rose-500 dark:hover:bg-rose-800 text-rose-200 hover:bg-rose-800'
			: kind === 'secondary'
			? 'bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-400 text-white dark:text-gray-900 dark:hover:bg-cyan-500'
			: kind === 'tertiary'
			? 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
			: 'bg-transparent text-gray-600 dark:text-gray-300 hover:text-cyan-600 hover:bg-gray-300 dark:hover:bg-gray-800 dark:hover:text-cyan-400'
	} ring-1 ring-transparent ring-inset focus:outline-none focus:ring-gray-300 dark:focus:ring-white transition-colors duration-150`;

	return (
		<div className='relative inline'>
			{href ? (
				<Link
					onMouseEnter={() => {
						setIsTooltipActive(true);
						onMouseEnter();
					}}
					onMouseLeave={() => {
						setIsTooltipActive(false);
						onMouseLeave();
					}}
					onClick={() => {
						setIsTooltipActive(false);
						onClick && onClick();
					}}
					className={`${commonLayoutClasses} ${commonTypographyClasses} ${
						isInactive
							? 'cursor-not-allowed bg-gray-800 text-gray-500'
							: commonStyleClasses
					} ${isSelected && !isInactive ? selectedClasses : ''} ${
						classes ? classes : ''
					}`}
					href={href}
				>
					{type !== 'icon' && (
						<span>
							{isLoading && <Spinner />}
							<span
								className={`whitespace-nowrap ${
									isLoading ? 'ml-1.5 md:ml-2' : ''
								} ${icon ? 'mr-1.5' : ''}`}
							>
								{title}
							</span>
						</span>
					)}
					{icon && icon}
				</Link>
			) : (
				<button
					aria-label={type === 'icon' ? title : ''}
					onMouseEnter={() => {
						setIsTooltipActive(true);
						onMouseEnter();
					}}
					onMouseLeave={() => {
						setIsTooltipActive(false);
						onMouseLeave();
					}}
					onClick={() => {
						setIsTooltipActive(false);
						onClick();
					}}
					className={`${commonLayoutClasses} ${commonTypographyClasses} ${
						isInactive
							? 'cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800'
							: commonStyleClasses
					} ${isSelected && !isInactive ? selectedClasses : ''} ${
						classes ? classes : ''
					}`}
					disabled={isInactive}
				>
					<>
						{type !== 'icon' && (
							<>
								{isLoading && <Spinner />}
								<span
									className={`whitespace-nowrap ${
										isLoading ? 'ml-1.5 md:ml-2' : ''
									} ${icon ? 'mr-1.5' : ''}`}
								>
									{title}
								</span>
							</>
						)}
						{icon && icon}
					</>
				</button>
			)}
			{isTooltipActive && type === 'icon' && (
				<Tooltip
					alignment={tooltipAlignment}
					position={tooltipPosition}
					size={size}
					title={title}
				/>
			)}
		</div>
	);
};

export default Button;
