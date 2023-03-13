// types
interface Props {
	classes: string;
	title: string | number;
	kind: 'success' | 'error' | 'info' | 'highlighted' | 'dark';
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
					? 'py-0.5 px-1 text-xs'
					: size === 'md'
					? 'px-1 text-sm'
					: 'py-1.5 px-2.5 text-sm'
			} border font-semibold ${
				kind === 'success'
					? 'border-green-900 bg-green-300 text-green-900'
					: kind === 'error'
					? 'border-red-900 bg-red-300 text-red-900'
					: kind === 'info'
					? 'border-zinc-900 bg-zinc-300 text-zinc-900'
					: kind === 'highlighted'
					? 'border-cyan-900 bg-cyan-400 text-zinc-900'
					: 'border-zinc-700 bg-zinc-900 text-white'
			} ${classes ? classes : ''}`}
		>
			{title}
		</span>
	);
};

export default Badge;
