'use client';

// react
import { useEffect, useState } from 'react';

// packages
import { DateTime } from 'luxon';
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

// lib
import { formatDifference } from '@utils/dateTime';
import { handlePluralization } from '@utils/string';

// components
import Button from '@components/utilities/Button';
import Divider from '@components/utilities/Divider';
import DropdownList from '@components/layout/DropdownList';
// import DropdownPanel from '@components/layout/DropdownPanel';
import DropdownShell from '@components/layout/DropdownShell';
import Link from '@components/utilities/Link';
import Toggle from '@components/utilities/Toggle';

// types
import type { Link as LinkType, LinkWithIcon } from '$types/Link';

const Header: React.FC = () => {
	// theme
	const { theme, setTheme } = useTheme();

	// state
	const [isFavoritesActive, setIsFavoritesActive] = useState(false);
	const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [isResourceMenuActive, setIsResourceMenuActive] = useState(false);
	const [isUserMenuActive, setIsUserMenuActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// state data
	const generalLinks: LinkType[] = [{ href: '/about', title: 'About' }];
	const resourceLinks: LinkWithIcon[] = [
		{ href: '/blog', icon: <Blog />, title: 'Blog' },
	];
	const settingsLinks: LinkWithIcon[] = [];

	// functions
	const closeMobileMenu = () => {
		setIsMobileMenuActive(false);
	};

	const handleSignOut = async () => {
		setIsUserMenuActive(false);
		closeMobileMenu();
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className='sticky top-0 z-40 w-full backdrop-blur-sm'>
			<div className='absolute h-full w-full border-b-2 border-zinc-200 opacity-90 dark:border-zinc-700 dark:bg-zinc-900' />
			<header aria-label='header' className='relative mx-auto w-full max-w-7xl'>
				<div className='flex items-center justify-between p-3 lg:justify-start lg:space-x-10 lg:px-5'>
					<a aria-label='Home' href='/' className='inline-block'>
						LOGO
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
											// isSelected={
											// 	browser && $page.url.pathname === `/${link.href}`
											// }
											kind='ghost'
											selectedClasses='text-cyan-400'
											title={title}
										/>
									</li>
								))}
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
										<DropdownShell position='left'>
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
							{isMounted && (
								<li>
									<Toggle
										defaultIsChecked={theme === 'dark'}
										itemLeft={<LightFilled />}
										itemRight={<AsleepFilled />}
										name='theme'
										onChange={() =>
											setTheme(theme === 'dark' ? 'light' : 'dark')
										}
									/>
								</li>
							)}
							<li>
								<Button
									classes='ml-3'
									href='/sign-in'
									icon={<ArrowRight />}
									title='Sign in'
								/>
							</li>
							<li>
								<Button href='/sign-up' icon={<ArrowRight />} title='Sign up' />
							</li>
						</ul>
					</div>
				</div>
				{/* {#if isMobileMenuActive}
			<nav
				className="shadow-stack absolute inset-x-3 z-40 mt-3 border-2 border-zinc-700 bg-zinc-900 py-5 md:inset-auto md:right-5 md:w-96 lg:hidden"
			>
				<ul>
					<li>
						<ul className="grid grid-flow-row grid-cols-2 gap-3 px-3">
							{#each generalLinks as link}
								<li>
									<Link
										href={`/${link.href}`}
										isUnderlined
										onClick={closeMobileMenu}
										title={link.title}
									/>
								</li>
							{/each}
						</ul>
					</li>
					<li className="mt-3 border-t-2 border-zinc-700 pt-3">
						<ul className="grid grid-flow-row grid-cols-2 gap-3 px-3">
							{#each resourceLinks as link}
								<li>
									<Link
										href={`/${link.href}`}
										isUnderlined
										onClick={closeMobileMenu}
										title={link.title}
									/>
								</li>
							{/each}
						</ul>
					</li>
					{#if $page.data.profile && $page.data.profile.approved && $page.data.profile.status !== 0}
						<li className="mt-3 border-t-2 border-zinc-700 pt-3">
							<ul className="grid grid-flow-row grid-cols-2 gap-3 px-3">
								{#each settingsLinks as link}
									<li>
										<Link
											href={`/${link.href}`}
											isUnderlined
											onClick={closeMobileMenu}
											title={link.title}
										/>
									</li>
								{/each}
							</ul>
						</li>
					{/if}
					<li className="mt-5 border-t-2 border-zinc-700 px-3 pt-3">
						<ul>
							{#if $page.data.profile}
								<li className="w-full">
									<Button
										icon={Logout}
										isCentered
										isFullWidth
										kind="tertiary"
										onClick={handleSignOut}
										spaceIconBetween
										title="Sign out"
									/>
								</li>
							{:else}
								<li>
									<Button
										href="/sign-in"
										icon={ArrowRight}
										isFullWidth
										kind="tertiary"
										onClick={closeMobileMenu}
										title="Sign in"
									/>
								</li>
								<li className="mt-1.5">
									<Button
										className="ml-0.5"
										href="/sign-up"
										icon={ArrowRight}
										isFullWidth
										onClick={closeMobileMenu}
										title="Request an invite"
									/>
								</li>
							{/if}
						</ul>
					</li>
				</ul>
			</nav>
		{/if} */}
			</header>
		</div>
	);
};

export default Header;
