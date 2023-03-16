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
				} z-10 bg-zinc-200 py-1.5 px-3 text-sm dark:bg-zinc-800`}
			>
				<div className='relative text-zinc-200 dark:text-zinc-800'>
					<svg
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className={`absolute -top-[17px] ${
							alignment === 'start'
								? size === 'sm' || size === 'field'
									? '-left-1'
									: 'left-0'
								: alignment === 'center'
								? 'left-1/2 -translate-x-1/2 transform'
								: size === 'sm' || size === 'field'
								? '-right-1'
								: 'right-0'
						} `}
						viewBox='0 0 16 16'
					>
						<path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
					</svg>
				</div>

				<span className='whitespace-nowrap text-zinc-900 dark:text-white'>
					{title}
				</span>
			</span>
		</>
	);
};

export default Tooltip;
