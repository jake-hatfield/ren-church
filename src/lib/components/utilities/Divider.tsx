// types
interface Props {
	classes?: string;
	title?: string;
}

const Divider: React.FC<Props> = ({ classes, title }) => {
	return (
		<span
			className={`flex items-center ${
				title
					? 'lf:after:ml-4 text-white before:mr-2 before:block before:flex-1 before:border-b-2 before:border-neutral-700 after:ml-2 after:block after:flex-1 after:border-b-2 after:border-neutral-700 lg:before:mr-4'
					: 'border-b-2 border-neutral-200 dark:border-neutral-700'
			} ${classes ? classes : ''}`}
		>
			{title && <p className='text-sm'>{title}</p>}
		</span>
	);
};

export default Divider;
