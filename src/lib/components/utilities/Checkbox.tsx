// types
interface Props {
	id: string;
	isChecked: boolean;
	name: string;
	onClick: () => {};
}

const Checkbox: React.FC<Props> = ({
	id,
	isChecked = false,
	name,
	onClick,
}) => {
	return (
		<input
			className='h-4 w-4 border-zinc-700 bg-zinc-700 text-cyan-500 focus:outline-none focus:ring-cyan-400'
			checked={isChecked}
			id={id}
			name={name}
			onClick={onClick}
			type='checkbox'
		/>
	);
};

export default Checkbox;
