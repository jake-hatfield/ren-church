// react
import { useState } from 'react';

// components
import Input from '@components/utilities/Input';
import Link from '@components/utilities/Link';
import Socials from '@components/navigation/Socials';

// assets
import Logo from '@assets/images/vectors/Logo';

// lib
import metadata from '@lib/metadata';
import placeholders from '@lib/metadata/placeholders';

// types
import type { Link as LinkType } from 'src/@types/Link';

const Footer = () => {
	// state
	const [email, setEmail] = useState('');

	const categoryOneLinks: LinkType[] = [
		{
			href: '/service',
			title: 'Service',
		},
		{
			href: '/house-church',
			title: 'House Church',
		},
		{ href: '/prayer', title: 'Prayer' },
		{
			href: '/intro',
			title: 'Intro Lunch',
		},
	];
	const categoryTwoLinks: LinkType[] = [
		{
			href: '/podcast',
			title: 'Podcast',
		},
		{
			href: '/resources/leadership-training',
			title: 'Leadership Training',
		},
		{
			href: '/resources/mens-study',
			title: "Men's Study",
		},
	];
	const categoryThreeLinks: LinkType[] = [
		{
			href: '/about',
			title: 'About',
		},
		{
			href: '/team',
			title: 'Our Team',
		},
		{
			href: '/contact',
			title: 'Contact',
		},
	];

	const miscLinks: LinkType[] = [
		{ href: '/sitemap.xml', title: 'Sitemap' },
		{ href: '/rss.xml', title: 'RSS' },
	];

	return (
		<footer
			aria-label='footer'
			className='mt-auto w-full border-t-2 border-rose-900 dark:border-gray-700 dark:bg-gray-900'
		>
			<div className='pt-content pb-content mx-auto max-w-7xl px-3 md:px-5'>
				<div className='md:grid md:grid-cols-5 md:gap-1.5 lg:gap-5'>
					<div>
						<a
							aria-label='Home'
							href='/'
							className='inline-block focus:ring-gray-900 focus:dark:ring-white'
						>
							<Logo />
						</a>
						<address className='mt-1.5 max-w-md'>
							{metadata.address.line1}
							<br />
							{metadata.address.line2}
						</address>
						<Link href={`mailto:${metadata.email}`} title={metadata.email} />
					</div>
					<div className='mt-8 md:mt-0'>
						<h4 className='headline-tertiary text-sm text-gray-600 dark:text-gray-400'>
							Connect
						</h4>
						<nav>
							<ul className='mt-3 space-y-3'>
								{categoryOneLinks.map(({ href, title }, i) => (
									<li className='flex items-start' key={i}>
										<Link href={href} title={title} />
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className='mt-8 md:mt-0'>
						<h4 className='headline-tertiary text-sm text-gray-600 dark:text-gray-400'>
							Resources
						</h4>
						<nav>
							<ul className='mt-3 space-y-3'>
								{categoryTwoLinks.map(({ href, title }, i) => (
									<li className='flex items-start' key={i}>
										<Link href={href} title={title} />
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className='mt-8 md:mt-0'>
						<h4 className='headline-tertiary text-sm text-gray-600 dark:text-gray-400'>
							About
						</h4>
						<nav>
							<ul className='mt-3 space-y-3'>
								{categoryThreeLinks.map(({ href, title }, i) => (
									<li className='flex items-start' key={i}>
										<Link href={href} title={title} />
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className='mt-8 md:mt-0'>
						<h4 className='headline-tertiary text-sm text-gray-600 dark:text-gray-400'>
							Connect
						</h4>
						<Input
							classes='mt-3'
							defaultType='text'
							id='footer-email'
							placeholder={placeholders.email}
							setValue={setEmail}
							value={email}
						/>
					</div>
				</div>
				<div className='mt-content border-t-2 border-rose-900 pt-5 dark:border-gray-700 md:flex md:items-end md:justify-between'>
					<div className='flex items-end'>
						<p>
							&copy; {new Date().getFullYear()} {metadata.siteTitle}. All rights
							reserved.
						</p>
						<nav>
							<ul className='mt-3 md:ml-3 md:mt-0 md:flex md:items-end'>
								{miscLinks.map(({ href, title }, i) => (
									<li className='mt-3 first:ml-0 md:ml-3 md:mt-0' key={i}>
										<Link href={href} title={title} />
									</li>
								))}
							</ul>
						</nav>
					</div>
					<Socials tooltipPosition='top' />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
