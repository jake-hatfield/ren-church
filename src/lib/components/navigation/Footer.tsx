// components
import Button from '@components/utilities/Button';
import Link from '@components/utilities/Link';

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
	const categoryOneLinks: LinkType[] = [];
	const categoryTwoLinks: LinkType[] = [];
	const socialLinks: LinkWithIcon[] = [
		{
			href: `https://twitter.com/intent/user?screen_name=${social.twitter}`,
			icon: <LogoFacebook />,
			title: 'Facebook',
		},
		{
			href: `https://youtube.com/@${social.youtube}`,
			icon: <LogoInstagram />,
			title: 'Instagram',
		},
		{
			href: `https://twitter.com/intent/user?screen_name=${social.twitter}`,
			icon: <LogoTwitter />,
			title: 'Twitter',
		},
		{
			href: `https://youtube.com/@${social.youtube}`,
			icon: <LogoYoutube />,
			title: 'YouTube',
		},
	];
	const categoryThreeLinks: LinkType[] = [];
	const miscLinks: LinkType[] = [
		{ href: '/sitemap.xml', title: 'Sitemap' },
		{ href: '/rss.xml', title: 'RSS' },
	];

	return (
		<footer
			aria-label='footer'
			className='mt-auto w-full border-t-2 border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900'
		>
			<div className='pt-content pb-content mx-auto max-w-7xl px-3 md:px-5'>
				<div className='md:grid md:grid-cols-5 md:gap-1.5 lg:gap-5'>
					<div className='md:col-span-2'>
						<a
							aria-label='Home'
							href='/'
							className='inline-block focus:ring-zinc-900 focus:dark:ring-white'
						>
							LOGO
						</a>
						<ul className='mt-3 flex items-center'>
							{socialLinks.map(({ href, icon, title }, i) => (
								<li className='ml-0.5 first:ml-0' key={i}>
									<Button
										href={href}
										icon={icon}
										kind='ghost'
										title={title}
										type='icon'
										tooltipAlignment={i === 0 ? 'start' : 'center'}
									/>
								</li>
							))}
						</ul>
						<address className='mt-1.5 max-w-md'>
							{address.line1}
							<br />
							{address.line2}
						</address>
					</div>
					<div className='mt-8 md:mt-0'>
						<p className='handwritten'>Category 1</p>
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
						<p className='handwritten'>Category 2</p>
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
						<p className='handwritten'>Category 3</p>
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
				</div>
				<div className='mt-content border-t-2 border-zinc-200 pt-5 dark:border-zinc-700 md:flex md:items-end md:justify-between'>
					<p>
						&copy; {new Date().getFullYear()} {metadata.siteTitle} All rights
						reserved.
					</p>
					<nav>
						<ul className='mt-3 md:mt-0 md:ml-3 md:flex md:items-end'>
							{miscLinks.map(({ href, title }, i) => (
								<li className='mt-3 first:ml-0 md:mt-0 md:ml-3' key={i}>
									<Link href={href} title={title} />
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
