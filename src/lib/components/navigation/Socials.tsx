// components
import Button from '@components/utilities/Button';

// lib
import metadata from '@lib/metadata';

// icons
import { LogoFacebook, LogoInstagram, LogoYoutube } from '@carbon/icons-react';

// types
import type { LinkWithIcon } from '$types/Link';

interface Props {
	tooltipPosition: 'top' | 'bottom';
}

const Socials: React.FC<Props> = ({ tooltipPosition }) => {
	// destructure
	const { social } = metadata;

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
		<ul className='flex items-center'>
			{socialLinks.map(({ href, icon, title }, i) => (
				<li className='ml-0.5 first:ml-0' key={i}>
					<Button
						href={href}
						icon={icon}
						kind='ghost'
						title={title}
						type='icon'
						tooltipAlignment={
							i === 0
								? 'start'
								: i === socialLinks.length - 1
								? 'end'
								: 'center'
						}
						tooltipPosition={tooltipPosition}
					/>
				</li>
			))}
		</ul>
	);
};

export default Socials;
