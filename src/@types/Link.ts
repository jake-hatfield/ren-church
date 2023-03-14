export interface Link {
	href: string;
	title: string;
}

export interface LinkWithIcon extends Link {
	icon: React.ReactNode;
}
