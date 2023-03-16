// packages
import { useTheme } from 'next-themes';

const Logo: React.FC = () => {
	// theme
	const { theme } = useTheme();

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 200 200'
			className='w-8'
			width={32}
			height={32}
		>
			<path
				d='M79 0H28a2.34 2.34 0 0 0-2 1.16L.48 45.34a2.29 2.29 0 0 0 0 2.32L26 91.84A2.34 2.34 0 0 0 28 93h51a2.34 2.34 0 0 0 2-1.16l25.5-44.18a2.29 2.29 0 0 0 0-2.32L81 1.16A2.34 2.34 0 0 0 79 0Z'
				style={{
					fill: theme === 'dark' ? '#f4f4f5' : '#3f3f46',
				}}
			/>
			<path
				d='M125.5 53.5h-51a2.34 2.34 0 0 0-2 1.16L47 98.84a2.29 2.29 0 0 0 0 2.32l25.5 44.18a2.34 2.34 0 0 0 2 1.16h51a2.34 2.34 0 0 0 2-1.16l25.5-44.18a2.29 2.29 0 0 0 0-2.32l-25.5-44.18a2.34 2.34 0 0 0-2-1.16Z'
				style={{
					fill: theme === 'dark' ? '#e4e4e7' : '#27272a',
				}}
			/>
			<path
				d='M172 107h-51a2.34 2.34 0 0 0-2 1.16l-25.5 44.18a2.29 2.29 0 0 0 0 2.32l25.5 44.18a2.34 2.34 0 0 0 2 1.16h51a2.34 2.34 0 0 0 2-1.16l25.5-44.18a2.29 2.29 0 0 0 0-2.32L174 108.16a2.34 2.34 0 0 0-2-1.16Z'
				style={{
					fill: theme === 'dark' ? '#d4d4d8' : '#18181b',
				}}
			/>
		</svg>
	);
};

export default Logo;
