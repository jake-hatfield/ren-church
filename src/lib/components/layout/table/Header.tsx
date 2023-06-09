'use client';

// react
import { useEffect, useState } from 'react';

// components
import Cell from '@components/layout/table/Cell';

// icons
import { ArrowDown, ArrowUp, ArrowsVertical } from '@carbon/icons-react';

// types
import type { Dispatch, SetStateAction } from 'react';
import type { HeaderCell, SortBy } from '$types/Table';
interface Props {
	getSortedAndPaginatedItems: (sortBy: SortBy) => Promise<void>;
	header: HeaderCell;
	setSortBy: Dispatch<SetStateAction<SortBy>>;
	size: 'sm' | 'md';
	sortBy: SortBy;
}

const Header: React.FC<Props> = ({
	getSortedAndPaginatedItems,
	header,
	setSortBy,
	size,
	sortBy,
}) => {
	const commonLayoutClasses = `${
		size === 'sm' ? 'py-3.5 px-2' : 'py-5 px-3'
	} content-uppercase text-xs text-left`;

	// state
	const [isHovered, setIsHovered] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		if (!sortBy) return;

		setIsSorted(sortBy.key === header.key);
	}, [header, sortBy]);

	return (
		<Cell kind='header' size={size}>
			{header.isSortable ? (
				<button
					className={`flex w-full items-center ${commonLayoutClasses} ring-1 ring-inset ring-transparent transition-colors duration-150 focus:outline-none focus:ring-white hover:bg-neutral-700 ${
						isSorted ? 'text-cyan-400' : 'hover:text-cyan-400'
					}`}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={() => {
						setSortBy({ ...sortBy, key: header.key, asc: !sortBy.asc });
						getSortedAndPaginatedItems(sortBy);
					}}
				>
					<span>{header.title}</span>
					{sortBy && (
						<span className='ml-3 w-4'>
							{isSorted ? (
								sortBy.asc ? (
									<ArrowUp />
								) : (
									<ArrowDown />
								)
							) : isHovered ? (
								<ArrowsVertical />
							) : (
								<></>
							)}
						</span>
					)}
				</button>
			) : (
				<span className={commonLayoutClasses}>{header.title}</span>
			)}
		</Cell>
	);
};

export default Header;
