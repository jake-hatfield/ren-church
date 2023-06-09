'use client';

// react
import { useState } from 'react';

// components
import Badge from '@components/utilities/Badge';
import Button from '@components/utilities/Button';
import Cell from '@components/layout/table/Cell';
import Checkbox from '@components/utilities/Checkbox';

// icons
import { OverflowMenuHorizontal } from '@carbon/icons-react';

// types
import type { TableRow } from '$types/Table';
import { Dispatch, SetStateAction } from 'react';
interface Props {
	defaultIsChecked: boolean;
	hasSelection?: boolean;
	row: TableRow;
	selectedRowIds: string[];
	setSelectedRowIds: Dispatch<SetStateAction<string[]>>;
	size: 'sm' | 'md';
}

const Row: React.FC<Props> = ({
	defaultIsChecked,
	hasSelection = false,
	row,
	selectedRowIds,
	setSelectedRowIds,
	size,
}) => {
	// state
	const [isChecked, setIsChecked] = useState(defaultIsChecked);
	const [isMenuActive, setIsMenuActive] = useState(false);

	// functions
	const onClick = () => {
		if (isChecked) {
			setSelectedRowIds(selectedRowIds.filter((r) => r !== row.id));
		} else {
			setSelectedRowIds([...selectedRowIds, row.id]);
		}

		setIsChecked((prev) => !prev);
	};

	return (
		<tr className='group:hover border-b-2 border-neutral-700 transition duration-150 last:border-transparent hover:bg-neutral-800'>
			{hasSelection && (
				<Cell classes='w-12 md:w-16' kind='body' size={size}>
					<div className='flex items-center justify-center'>
						<Checkbox
							defaultIsChecked={isChecked}
							id='table-body-checkbox'
							name='Table body checkbox'
							onClick={() => onClick()}
						/>
					</div>
				</Cell>
			)}
			{row.data.map((cell, i) => (
				<Cell key={i} kind='body' size={size}>
					{cell.badge?.active ? (
						<Badge kind={cell.badge.kind} title={cell.value} />
					) : (
						<p>{cell.value}</p>
					)}
				</Cell>
			))}
			{row.actions.length > 0 && (
				<Cell kind='body' size={size}>
					{row.actions.length >= 5 ? (
						<div className='relative'>
							<Button
								icon={<OverflowMenuHorizontal />}
								kind='ghost'
								onClick={() => setIsMenuActive((prev) => !prev)}
								size='sm'
								title='Menu'
								type='icon'
							/>
							{isMenuActive && (
								<ul className='absolute right-0 top-10 z-20 w-48 border-2 border-neutral-700'>
									{row.actions.map((action, i) => (
										<li className='mt-0.5 first:mt-0' key={i}>
											<Button
												href={action.href ?? ''}
												icon={action.icon}
												isDisabled={!action?.href && !action?.onClick}
												isFullWidth
												kind='ghost'
												onClick={() =>
													!action.href &&
													typeof action?.onClick !== 'undefined' &&
													action.onClick()
												}
												title={action.title}
												tooltipAlignment='end'
											/>
										</li>
									))}
								</ul>
							)}
						</div>
					) : (
						<ul className='flex items-center justify-end'>
							{row.actions.map((action, i) => (
								<li className='ml-0.5 first:ml-0' key={i}>
									<Button
										href={action.href ?? ''}
										icon={action.icon}
										isDisabled={action.disabled}
										kind={action?.kind ?? 'ghost'}
										onClick={() => {
											if (
												!action.href &&
												typeof action?.onClick !== 'undefined'
											) {
												action.onClick();
											}
										}}
										title={action.title}
										tooltipAlignment='end'
										type={action.type}
									/>
								</li>
							))}
						</ul>
					)}
				</Cell>
			)}
		</tr>
	);
};

export default Row;
