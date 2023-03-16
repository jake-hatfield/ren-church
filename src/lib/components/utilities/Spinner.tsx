'use client';

// react
import { useEffect, useState } from 'react';

// packages
import { useTheme } from 'next-themes';

// types
interface Props {
	classes?: string;
}

const Spinner: React.FC<Props> = ({ classes }) => {
	// theme
	const { theme } = useTheme();

	// state
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<svg
			className={classes}
			width='18'
			height='18'
			viewBox='0 0 38 38'
			xmlns='http://www.w3.org/2000/svg'
			stroke={theme === 'dark' ? '#D1D5DB' : '#27272A'}
		>
			<g fill='none' fillRule='evenodd'>
				<g transform='translate(1 1)' strokeWidth='2'>
					<circle strokeOpacity='.5' cx='18' cy='18' r='18' />
					<path d='M36 18c0-9.94-8.06-18-18-18'>
						<animateTransform
							attributeName='transform'
							type='rotate'
							from='0 18 18'
							to='360 18 18'
							dur='1s'
							repeatCount='indefinite'
						/>
					</path>
				</g>
			</g>
		</svg>
	);
};

export default Spinner;
