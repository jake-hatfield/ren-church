// types
interface Props {
	description: string;
	format: 'square' | 'rect';
	title: string;
}

const OpenGraphImage: React.FC<Props> = ({ description, format, title }) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyItems: 'start',
				position: 'relative',
				flexDirection: 'column',
				height: '100%',
				width: '100%',
				padding: '50px',
				backgroundColor: '#18181B',
				borderWidth: '4px',
				borderColor: '#3f3f46',
				color: '#fff',
			}}
		>
			{title && (
				<div
					style={{
						display: 'flex',
						fontSize: format === 'rect' ? '80px' : '50px',
					}}
				>
					<div>{title}</div>
				</div>
			)}
			{description && format === 'rect' && (
				<p style={{ color: '#e4e4e7', fontSize: '45px', lineHeight: '60px' }}>
					{description}
				</p>
			)}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					position: 'absolute',
					backgroundColor: '#fffc15',
					left: '0px',
					right: '0px',
					bottom: '0px',
					padding: '25px 25px 25px 50px',
					borderTopWidth: '4px',
					borderColor: '#bfbd00',
				}}
			>
				LOGO
			</div>
		</div>
	);
};

export default OpenGraphImage;
