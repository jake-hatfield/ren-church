'use client';

// components
import Footer from '@lib/components/navigation/Footer';
import Header from '@lib/components/navigation/Header';
import DarkTheme from '@components/layout/DarkTheme';
import SkeletonTheme from '@components/layout/SkeletonTheme';

// fonts
import '@fontsource/dm-serif-display';
import '@fontsource/lato';
import '@fontsource-variable/oswald';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<DarkTheme>
			<SkeletonTheme>
				<div className='relative flex h-full min-h-screen flex-col items-start bg-gray-200 dark:bg-gray-900'>
					<Header />
					<main className='minimal-scrollbar relative h-full w-full'>
						{children}
					</main>
					<Footer />
				</div>
			</SkeletonTheme>
		</DarkTheme>
	);
};

export default Layout;
