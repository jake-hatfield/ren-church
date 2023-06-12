'use client';

// react
import { useEffect, useState } from 'react';

// next
import { usePathname } from 'next/navigation';

// packages
import { useTheme } from 'next-themes';

// icons
import {
	ArrowRight,
	AsleepFilled,
	Blog,
	ChevronDown,
	ChevronUp,
	Close,
	LightFilled,
	Menu,
} from '@carbon/icons-react';

// components
import Button from '@components/utilities/Button';
import DropdownList from '@components/layout/DropdownList';
import DropdownShell from '@components/layout/DropdownShell';
import Link from '@components/utilities/Link';
import Socials from '@components/navigation/Socials';
import Toggle from '@components/utilities/Toggle';

// assets
import Logo from '@assets/images/vectors/Logo';

// types
import type { Link as LinkType } from '$types/Link';

const Header: React.FC = () => {
	// theme
	const { theme } = useTheme();

	// next
	const pathname = usePathname();

	// state
	const [isConnectMenuActive, setIsConnectMenuActive] = useState(false);
	const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [isResourceMenuActive, setIsResourceMenuActive] = useState(false);

	// state data
	const generalLinks: LinkType[] = [
		{ href: '/about', title: 'About' },
		{ href: '/livestream', title: 'Livestream' },
	];
	const connectLinks: LinkType[] = [
		{ href: '/service', title: 'Service' },
		{ href: '/house-church', title: 'House Church' },
		{ href: '/prayer', title: 'Prayer' },
		{ href: '/intro', title: 'Intro Lunch' },
	];
	const resourceLinks: LinkType[] = [
		{ href: '/podcast', title: 'Podcast' },
		{
			href: '/resources/leadership-training',

			title: 'Leadership Training',
		},
		{ href: '/resources/mens-study', title: "Men's Study" },
	];

	// functions
	const closeMobileMenu = () => {
		setIsMobileMenuActive(false);
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className='sticky top-0 z-40 w-full backdrop-blur-md'>
			<div
				className={`absolute h-full w-full border-b-2 border-rose-900 dark:border-gray-700 dark:bg-gray-900 ${
					isMounted && theme === 'dark' ? 'opacity-90' : ''
				}`}
			/>
			<header aria-label='header' className='relative mx-auto w-full max-w-7xl'>
				<div className='flex items-center justify-between p-3 lg:justify-start lg:space-x-10 lg:px-5'>
					<a aria-label='Home' href='/' className='inline-block'>
						<Logo />
					</a>
					<div className='lg:hidden'>
						<Button
							icon={isMobileMenuActive ? <Close /> : <Menu />}
							kind='ghost'
							onClick={() => setIsMobileMenuActive((prev) => !prev)}
							title='Menu'
							type='icon'
						/>
					</div>
					<div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-between'>
						<nav className='flex space-x-10'>
							<ul className='relative hidden items-center md:flex'>
								{generalLinks.map(({ href, title }, i) => (
									<li className='ml-0.5 first:ml-0' key={i}>
										<Button
											href={href}
											isSelected={pathname === href}
											kind='ghost'
											selectedClasses='text-cyan-400'
											title={title}
										/>
									</li>
								))}
								<li className='relative ml-0.5'>
									<Button
										icon={isConnectMenuActive ? <ChevronUp /> : <ChevronDown />}
										kind='ghost'
										onClick={() => setIsConnectMenuActive((prev) => !prev)}
										title='Connect'
									/>
									{isConnectMenuActive && (
										<DropdownShell classes='w-48' position='left'>
											<DropdownList
												items={connectLinks}
												setIsActive={setIsConnectMenuActive}
											/>
										</DropdownShell>
									)}
								</li>
								<li className='relative ml-0.5'>
									<Button
										icon={
											isResourceMenuActive ? <ChevronUp /> : <ChevronDown />
										}
										kind='ghost'
										onClick={() => setIsResourceMenuActive((prev) => !prev)}
										title='Resources'
									/>
									{isResourceMenuActive && (
										<DropdownShell classes='w-48' position='left'>
											<DropdownList
												items={resourceLinks}
												setIsActive={setIsResourceMenuActive}
											/>
										</DropdownShell>
									)}
								</li>
							</ul>
						</nav>
						<ul className='flex items-center space-x-0.5'>
							<li>
								<Socials tooltipPosition='bottom' />
							</li>
							<li>
								<Button
									classes='ml-5'
									href='/give'
									icon={<ArrowRight />}
									title='Give'
								/>
							</li>
						</ul>
					</div>
				</div>
				{isMobileMenuActive && (
					<nav className='shadow-stack absolute inset-x-3 z-40 mt-3 border-2 border-gray-700 bg-gray-900 py-5 md:inset-auto md:right-5 md:w-96 lg:hidden'>
						<ul>
							<li>
								<ul className='grid grid-flow-row grid-cols-2 gap-3 px-3'>
									{generalLinks.map((link, i) => (
										<li key={i}>
											<Link
												href={`/${link.href}`}
												onClick={closeMobileMenu}
												title={link.title}
											/>
										</li>
									))}
								</ul>
							</li>
							<li className='mt-3 border-t-2 border-gray-700 pt-3'>
								<ul className='grid grid-flow-row grid-cols-2 gap-3 px-3'>
									{resourceLinks.map((link, i) => (
										<li key={i}>
											<Link
												href={`/${link.href}`}
												onClick={closeMobileMenu}
												title={link.title}
											/>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</nav>
				)}
			</header>
		</div>
	);
};

export default Header;
