// next
import NextLink from 'next/link';

// icons
import { Launch } from '@carbon/icons-react';

// types
import type { ArrowRight } from '@carbon/icons-react';
interface Props {
	children?: typeof ArrowRight;
	href: string;
	isBlock?: boolean;
	isDisabled?: boolean;
	isExternal?: boolean;
	isNoFollow?: boolean;
	onClick?: () => void;
	title: string;
}

const Link: React.FC<Props> = ({
	children,
	href,
	isBlock = false,
	isDisabled = false,
	isExternal = false,
	isNoFollow = false,
	onClick,
	title,
}) => {
	const commonClasses = `${isBlock ? 'block' : 'inline'} link ${
		children || isExternal ? 'mr-1' : ''
	}`;

	return isDisabled ? (
		<p className={`${commonClasses} text-gray-500 text-opacity-80`}>
			<>
				{title}
				{children && children}
			</>
		</p>
	) : isExternal ? (
		<a
			className={commonClasses}
			href={href}
			rel={`noopener noreferrer ${isNoFollow ? 'nofollow' : ''}`}
			target='_blank'
		>
			<span>{title}</span>
			<Launch className='ml-0.5 inline' />
		</a>
	) : (
		<NextLink className={commonClasses} href={href} onClick={onClick}>
			<>
				{title}
				{children && children}
			</>
		</NextLink>
	);
};

export default Link;
