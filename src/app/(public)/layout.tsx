'use client';

// packages
import { ThemeProvider } from 'next-themes';

// components
import Footer from '@lib/components/navigation/Footer';
import Header from '@lib/components/navigation/Header';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute='class'>
			<div className='relative flex h-full min-h-screen flex-col items-start bg-white dark:bg-zinc-900'>
				<Header />
				<main className='relative h-full w-full'>{children}</main>
				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default PublicLayout;
