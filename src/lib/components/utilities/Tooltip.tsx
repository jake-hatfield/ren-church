// types
interface Props {
	alignment: 'start' | 'center' | 'end';
	position: 'top' | 'bottom';
	size: 'sm' | 'md' | 'lg' | 'field';
	title: string;
}

const Tooltip: React.FC<Props> = ({
	alignment = 'center',
	position = 'bottom',
	size = 'md',
	title,
}) => {
	return (
		<>
			<span
				aria-hidden='true'
				aria-expanded='true'
				className={`absolute w-full min-w-fit ${
					alignment === 'start'
						? 'left-0'
						: alignment === 'center'
						? 'left-1/2 -translate-x-1/2 transform text-center'
						: 'right-0'
				} ${
					position === 'top'
						? size === 'sm'
							? 'bottom-10'
							: 'bottom-14'
						: size === 'sm'
						? 'top-10'
						: 'top-14'
				} z-10 bg-gray-900 px-3 py-1.5 text-sm text-gray-200 dark:bg-gray-800`}
			>
				<div className='relative text-gray-900'>
					<svg
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className={`absolute transform ${
							alignment === 'start'
								? size === 'sm' || size === 'field'
									? '-left-1'
									: 'left-0'
								: alignment === 'center'
								? 'left-1/2 -translate-x-1/2 '
								: size === 'sm' || size === 'field'
								? '-right-1'
								: 'right-0'
						} ${position === 'top' ? 'top-5 rotate-180' : '-top-[17px]'}`}
						viewBox='0 0 16 16'
					>
						<path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
					</svg>
				</div>

				<span className='whitespace-nowrap'>{title}</span>
			</span>
		</>
	);
};

export default Tooltip;
