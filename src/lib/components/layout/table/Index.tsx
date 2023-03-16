'use client';

// react
import { useCallback, useEffect, useState } from 'react';

// components
import Button from '@components/utilities/Button';
import Checkbox from '@components/utilities/Checkbox';
import Cell from '@components/layout/table/Cell';
import Header from '@components/layout/table/Header';
import Row from '@components/layout/table/Row';

// icons
import { ArrowLeft, ArrowRight, ChevronDown } from '@carbon/icons-react';

// lib
import { itemsPerPage as apiItemsPerPage } from '@utils/api';
import { parseObject } from '@utils/localStorage';
import { objectHasValue } from '@utils/object';
import { handlePluralization } from '@utils/string';

// lib

// types
import type { HeaderCell, SortBy, TableRow } from '$types/Table';
import type { EmptyState as EmptyStateType } from '$types/EmptyState';
interface Props {
	allItems?: any[];
	apiEndpoint?: string;
	areAllSelected?: boolean;
	classes?: string;
	createRow: (item: any) => TableRow;
    defaultSortBy: SortBy;
	emptyState: EmptyStateType;
	hasPagination?: boolean;
	hasSelection?: boolean;
	headers: HeaderCell[];
	id: string;
	items: any[];
	itemsPerPage?: number;
	page?: number;
	primaryAction?: () => void;
	size?: 'sm' | 'md';

	totalItems: number;
}

const Table: React.FC<Props> = ({
	allItems = [],
	apiEndpoint = '',
	areAllSelected = false,
	classes,
	createRow,
    defaultSortBy,
	emptyState,
	hasPagination = false,
	hasSelection = false,
	headers,
	id,
	items,
	itemsPerPage = apiItemsPerPage,
	page = 1,
	primaryAction,
	size = 'sm',

	totalItems,
}) => {
	// validation for conditionally required props
	if (hasSelection && !primaryAction) {
		throw new Error('Tables that have selection must include a primary action');
	}
	if (hasPagination && (!apiEndpoint || typeof totalItems === 'undefined')) {
		throw new Error(
			'Tables that have pagination must include an API endpoint + total items'
		);
	}

	// state
	const [isItemsPerPageActive, setIsItemsPerPageActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isPagesActive, setIsPagesActive] = useState(false);
	const [itemsFrom, setItemsFrom] = useState(1);
	const [itemsTo, setItemsTo] = useState(itemsPerPage);
	const [rows, setRows] = useState<TableRow[]>([]);
	const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
	const [shouldRequestNewItems, setShouldRequestNewItems] = useState(false);
    const [sortBy, setSortBy] = useState(defaultSortBy)

	// functions
	const getSortedAndPaginatedItems = useCallback(
		async (sortBy: SortBy) => {
			try {
				if (isLoading) return;

				setIsLoading(true);

				let fetchUrl: string;

				if (apiEndpoint.includes('stripe')) fetchUrl = '';
				else
					fetchUrl = `${apiEndpoint}?page=${page}&items=${itemsPerPage}&sortKey=${sortBy.key}&sortAsc=${sortBy.asc}`;

				const res = await fetch(fetchUrl);

				const body = await res.json();

				setRows(body.items.map((item: any) => createRow(item)));
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[apiEndpoint, createRow, isLoading, itemsPerPage, page]
	);

	const handleAllRowSelect = () => {
		if (areAllSelected) {
			// empty the array
			setSelectedRowIds([]);
		} else {
			// add row id to array of selected rows
			setSelectedRowIds(rows.map((r) => r.id));
		}

		areAllSelected = !areAllSelected;
	};

	// update pagination
	useEffect(() => {
		setItemsFrom(page === 1 ? page : page * itemsPerPage - itemsPerPage + 1);
		setItemsTo(
			totalItems < page * itemsPerPage ? totalItems : page * itemsPerPage
		);
	}, [itemsPerPage, page, totalItems]);

	useEffect(() => {
		if (!shouldRequestNewItems) return;
		getSortedAndPaginatedItems(sortBy);
	}, [
		getSortedAndPaginatedItems,
		itemsPerPage,
		page,
		shouldRequestNewItems,
		sortBy,
	]);

	// update rows
	useEffect(() => {
		setRows(items.length > 0 ? items.map((item) => createRow(item)) : []);
	}, [createRow, items]);

	// populate settings
	useEffect(() => {
		// if (objectHasValue(storedTableSettings)) {
		// itemsPerPage = storedTableSettings.itemsPerPage;
		// page = storedTableSettings.page;
		// await getSortedAndPaginatedItems(sortBy);
		// }
	}, []);

	return <div className={`pb-32 ${classes ? classes : ''}`}>
{rows && rows.length > 0}
		{/* toolbar */}
		{primaryAction && 	<div className="flex items-end justify-end">
				<Button
					classes="mx-0.5"
					icon={primaryAction.icon}
					isDisabled={selectedRowIds.length === 0}
					kind="secondary"
					size={size}
					title={primaryAction.title}
				/>
			</div>}
		<div className="minimal-scrollbar overflow-x-auto pb-12">
			{/* table */}
			<table className="w-full">
				<thead className="bg-zinc-800">
					<tr>
						{hasSelection && <Cell classes="w-12 md:w-16" kind="body" size={size}>
								<div className="flex items-center justify-center">
									<Checkbox
										defaultIsChecked={areAllSelected}
										id="table-header-checkbox"
										name="Table header checkbox"
										onClick={() => handleAllRowSelect()}
									/>
								</div>
							</Cell>}


						{headers.map((header) => (<Header getSortedAndPaginatedItems={getSortedAndPaginatedItems} header={header} setSortBy={setSortBy} size={size} sortBy={sortBy} />))}

						{hasRowAction &&
                        <Cell kind="header" size={size}>
								<span />
							</Cell>}


					</tr>
				</thead>
				<tbody>
					{isLoading ? {Array.from({ length: itemsPerPage }, (_, i) => i + 1).map((item, i) => (

                    // <Skeleton height={53} width={1216} primaryColor="#27272A" secondaryColor="#3F3F46">
					// 			<rect width={1208} height={40} x={4} y={item + 7} />
					// 		</Skeleton>
                    <p>Loading...</p>
                            ))}

						 : rows.map((row, i) => (<Row hasSelection={hasSelection} isChecked={areAllSelected} row={row} bind:selectedRowIds size={size} />))

                }


				</tbody>
			</table>
		</div>
		{hasPagination && <div className="flex items-center justify-between border-t-2 border-zinc-700 px-2">
				<div className="flex items-center">
					<div className="border-r-2 border-zinc-700 pr-1.5">
						<div className="flex items-center pt-1.5">
							<p className="flex items-center text-zinc-300">
								<span>Items</span> <span className="ml-1.5 hidden md:block">per page:</span>
							</p>
							<div
								className="relative ml-3"
								// use:handleClickOutside={{
								// 	enabled: isItemsPerPageActive,
								// 	cb: () => (isItemsPerPageActive = false),
								// }}
							>
								<Button
									icon={<ChevronDown/>}
									kind="ghost"
									onClick={() => setIsItemsPerPageActive(prev => !prev)}
									title={itemsPerPage.toString()}
								/>
								{isItemsPerPageActive &&	<ul
										className="shadow-stack absolute inset-x-0 top-12 border-2 border-t-4 border-zinc-700 bg-zinc-900"
									>
										{[5, 10, 25].map((option, i) => (<li key={i}>
												<button
													className="w-full transform p-1.5 text-left transition-colors duration-150 hover:bg-zinc-800"
													onClick={() => {
														page = 1;
														itemsPerPage = option;
                                                        setShouldRequestNewItems(true)
                                                        setIsItemsPerPageActive(false)
													}}
												>
													{option}
												</button>
											</li>))}


									</ul>}


							</div>
						</div>
					</div>
					<div className="hidden px-3 pt-1.5 text-zinc-300 md:flex md:items-center">
						<p>{itemsFrom}-{itemsTo} of {handlePluralization('item', totalItems, true)}</p>
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex items-center pt-1.5 pl-1.5 md:border-l-2 md:border-zinc-700">
						<div
							className="relative"
							// use:handleClickOutside={{
							// 	enabled: isPagesActive,
							// 	cb: () => (isPagesActive = false),
							// }}
						>
							<Button
								isDisabled={totalItems < page * itemsPerPage}
								icon={<ChevronDown/>}
								kind="ghost"
								onClick={() => setIsPagesActive(prev => !prev)}
								title={page.toString()}
							/>
							{isPagesActive && <ul
									className="shadow-stack minimal-scrollbar absolute inset-x-0 top-12 max-h-28 overflow-y-auto border-2 border-t-4 border-zinc-700 bg-zinc-900"
								>
									{Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map((item, i) => (	<li key={i}>
											<button
												className="w-full transform p-1.5 text-left transition-colors duration-150 hover:bg-zinc-800"
												onClick={async () => {
													page = item;
                                                    setShouldRequestNewItems(true)
                                                    setIsPagesActive(false)
												}}
											>
												{item}
											</button>
										</li>))}


								</ul>}


						</div>
						<p className="hidden pl-1.5 pr-3 text-zinc-300 md:block">
							of {handlePluralization(
								'page',
								totalItems / itemsPerPage < 1 ? 1 : Math.ceil(totalItems / itemsPerPage),
								true,
							)}
						</p>
					</div>
					<div className="flex items-center border-l-2 border-zinc-700 pl-1.5 pt-1.5">
						<Button
							icon={<ArrowLeft/>}
							isDisabled={page < 2}
							kind="ghost"
							onClick={() => {
                                setShouldRequestNewItems(true)
								page = page - 1;
							}}
							title="Previous page"
							type="icon"
						/>
						<Button
							classes="ml-0.5"
							icon={<ArrowRight/>}
							isDisabled={totalItems < page * itemsPerPage || itemsTo === totalItems}
							kind="ghost"
							onClick={() => {
                                setShouldRequestNewItems(true)
								page = page + 1;
							}}
							title="Next page"
							tooltipAlignment="end"
							type="icon"
						/>
					</div>
				</div>
			</div>}



		{/* <EmptyState {emptyState} /> */}


    </div>;
};

export default Table;
