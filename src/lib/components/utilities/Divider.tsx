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
					? 'lf:after:ml-4 text-white before:mr-2 before:block before:flex-1 before:border-b-2 before:border-zinc-700 after:ml-2 after:block after:flex-1 after:border-b-2 after:border-zinc-700 lg:before:mr-4'
					: 'border-b-2 border-zinc-700'
			} ${classes ? classes : ''}`}
		>
			{title && <p className='handwritten text-sm'>{title}</p>}
		</span>
	);
};

export default Divider;
