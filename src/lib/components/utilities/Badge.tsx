// types
interface Props {
	classes?: string;
	title: string | number;
	kind: 'success' | 'error' | 'info' | 'highlighted' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<Props> = ({
	classes,
	kind = 'info',
	size = 'sm',
	title,
}) => {
	return (
		<span
			className={`${
				size === 'sm'
					? 'px-1 py-0.5 text-xs'
					: size === 'md'
					? 'px-1 text-sm'
					: 'px-2.5 py-1.5 text-sm'
			} border font-semibold ${
				kind === 'success'
					? 'border-green-300 bg-green-200 text-green-700 dark:border-green-900 dark:bg-green-300 dark:text-green-900'
					: kind === 'error'
					? 'border-red-400 bg-red-300 text-red-600 dark:border-red-900 dark:text-red-900'
					: kind === 'info'
					? 'border-neutral-300 bg-neutral-200 text-neutral-700 dark:border-neutral-900 dark:bg-neutral-300 dark:text-neutral-900'
					: kind === 'highlighted'
					? 'border-cyan-500 bg-cyan-400 text-cyan-800 dark:border-cyan-900 dark:bg-cyan-400 dark:text-neutral-900'
					: 'border-neutral-200 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white'
			} ${classes ? classes : ''}`}
		>
			{title}
		</span>
	);
};

export default Badge;
