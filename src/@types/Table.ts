export interface HeaderCell {
	isSortable: boolean;
	key: string;
	title: string;
}

export interface TableRow {
	id: string;
	data: RowData[];
	actions: RowAction[];
}

export interface RowAction {
	disabled?: boolean;
	href?: string;
	icon: React.ReactNode;
	isNoFollow?: boolean;
	kind?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
	loading: boolean;
	onClick?: () => any;
	title: string;
	type?: 'icon' | 'full';
}

export interface RowData {
	badge: {
		active: boolean;
		kind: 'info' | 'success' | 'error';
	};
	id: string;
	sortValue?: string | number | null;
	value: string | number;
}

export interface SortBy {
	key: string;
	asc: boolean;
}
