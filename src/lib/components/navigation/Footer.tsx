// components
import Button from '@components/utilities/Button';
import Link from '@components/utilities/Link';
import Logo from '@assets/images/vectors/Logo';

// icons
import {
	LogoFacebook,
	LogoInstagram,
	LogoTwitter,
	LogoYoutube,
} from '@carbon/icons-react';

// lib
import metadata from '@lib/metadata';

// types
import type { Link as LinkType, LinkWithIcon } from 'src/@types/Link';

const Footer = () => {
	// destructure
	const { address, social } = metadata;

	// state
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
			href: '/greenhouse',
			title: 'Leadership Training',
		},
		{
			href: '/framework-journal',
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
	const socialLinks: LinkWithIcon[] = [
		{
			href: social.facebook,
			icon: <LogoFacebook />,
			title: 'Facebook',
		},
		{
			href: social.instagram,
			icon: <LogoInstagram />,
			title: 'Instagram',
		},
		{
			href: social.youtube,
			icon: <LogoYoutube />,
			title: 'YouTube',
		},
	];

	return (
		<footer
			aria-label='footer'
			className='mt-auto w-full border-t-2 border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900'
		>
			<div className='pt-content pb-content mx-auto max-w-7xl px-3 md:px-5'>
				<div className='md:grid md:grid-cols-5 md:gap-1.5 lg:gap-5'>
					<div className='md:col-span-2'>
						<a
							aria-label='Home'
							href='/'
							className='inline-block focus:ring-neutral-900 focus:dark:ring-white'
						>
							<Logo />
						</a>

						<address className='mt-1.5 max-w-md'>
							{address.line1}
							<br />
							{address.line2}
						</address>
					</div>
					<div className='mt-8 md:mt-0'>
						<p className='headline-tertiary text-sm text-neutral-600 dark:text-neutral-400'>
							Connect
						</p>
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
						<p className='headline-tertiary text-sm text-neutral-600 dark:text-neutral-400'>
							Resources
						</p>
						<nav>
							<ul className='mt-3 space-y-3'>
								{categoryTwoLinks.map(({ href, title }, i) => (
									<li className='flex items-start' key={i}>
										<Link href={`/resources${href}`} title={title} />
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className='mt-8 md:mt-0'>
						<p className='headline-tertiary text-sm text-neutral-600 dark:text-neutral-400'>
							About
						</p>
						<nav>
							<ul className='mt-3 space-y-3'>
								{categoryThreeLinks.map(({ href, title }, i) => (
									<li className='flex items-start' key={i}>
										<Link href={`/resources${href}`} title={title} />
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
				<div className='mt-content border-t-2 border-neutral-200 pt-5 dark:border-neutral-700 md:flex md:items-end md:justify-between'>
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
					<ul className='flex items-center'>
						{socialLinks.map(({ href, icon, title }, i) => (
							<li className='ml-0.5 first:ml-0' key={i}>
								<Button
									href={href}
									icon={icon}
									kind='ghost'
									title={title}
									type='icon'
									tooltipAlignment={i === 0 ? 'start' : 'center'}
									tooltipPosition='top'
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
