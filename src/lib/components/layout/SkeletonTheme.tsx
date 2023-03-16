'use client';

// packages
import { useTheme } from 'next-themes';
import { SkeletonTheme } from 'react-loading-skeleton';

// assets
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonThemeLayout = ({ children }: { children: React.ReactNode }) => {
	// theme
	const { theme } = useTheme();

	return (
		<SkeletonTheme
			baseColor={theme === 'dark' ? '#3f3f46' : '#e4e4e7'}
			borderRadius={0}
			highlightColor={theme === 'dark' ? '#52525b' : '#d4d4d8'}
		>
			{children}
		</SkeletonTheme>
	);
};

export default SkeletonThemeLayout;
