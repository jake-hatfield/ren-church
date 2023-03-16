export interface EmptyState {
	button?: {
		href: string;
		icon?: React.ReactNode;
		onClick?: () => void;
		title: string;
	};
	description: string;
	icon: React.ReactNode;
	size: 'sm' | 'md' | 'lg';
	title: string;
}
