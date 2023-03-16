// packages
import { v4 as uuidv4 } from 'uuid';

// types
import type { RowAction, RowData, TableRow } from '$types/Table';

export const createAction = ({
	disabled,
	href,
	icon,
	isNoFollow,
	kind,
	loading = false,
	onClick,
	title,
	type = 'icon',
}: {
	disabled?: boolean;
	href?: string;
	icon: React.ReactNode;
	isNoFollow?: boolean;
	kind?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | undefined;
	loading: boolean;
	onClick?: () => any;
	title: string;
	type?: 'icon' | 'full';
}): RowAction => {
	return {
		disabled,
		href,
		icon,
		kind,
		isNoFollow,
		loading,
		onClick,
		title,
		type,
	};
};

export const createActionCell = (actions: RowAction[]) => {
	return actions.map((a) => createAction(a));
};

export const createRow = (
	id: string,
	data: RowData[],
	actions?: RowAction[]
): TableRow => {
	return {
		id: id ?? uuidv4(),
		data,
		actions: actions ? createActionCell(actions) : [],
	};
};

export const createCell = (
	value: string | number,
	badge: {
		active: boolean;
		kind: 'error' | 'success' | 'info';
	} = {
		active: false,
		kind: 'info',
	}
): RowData => {
	return {
		id: uuidv4(),
		value,
		badge: {
			active: badge.active,
			kind: badge.kind,
		},
	};
};
