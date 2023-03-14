// components
import Button from '@components/utilities/Button';

// types
import type { CarbonIconType } from '@carbon/icons-react';
import type { Dispatch, SetStateAction } from 'react';
interface Props {
	items: { href: string; icon: React.ReactNode | null; title: string }[];
	setIsActive: Dispatch<SetStateAction<boolean>>;
}

const DropdownList: React.FC<Props> = ({ items, setIsActive }) => {
	return (
		<ul>
			{items.map(({ href, icon, title }, i) => (
				<li key={i}>
					<Button
						href={href}
						icon={icon}
						isFullWidth
						kind='ghost'
						spaceIconBetween
						onClick={() => setIsActive((prev) => (prev = false))}
						title={title}
					/>
				</li>
			))}
		</ul>
	);
};

export default DropdownList;
