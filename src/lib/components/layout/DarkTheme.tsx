'use client';

// packages
import { ThemeProvider } from 'next-themes';

const DarkThemeLayout = ({ children }: { children: React.ReactNode }) => {
	return <ThemeProvider attribute='class'>{children}</ThemeProvider>;
};

export default DarkThemeLayout;
