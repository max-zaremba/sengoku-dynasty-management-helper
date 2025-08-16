'use client';

import { Column, ColumnKey, tableColumns } from '@/lib/columns';
import { Button } from '../ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import React from 'react';
import { SORT_DIRECTION, SortDirection } from '@/lib/types/sort-types';

interface ItemTableHeaderRowProps {
	sortField: ColumnKey | undefined;
	sortDirection: SortDirection;
	onSortClick: (field: ColumnKey) => void;
	visibleHeaders?: string[];
}

const getSortIcon = (
	columnKey: ColumnKey,
	sortField: ColumnKey | undefined,
	sortDirection: SortDirection,
) => {
	if (columnKey !== sortField || sortDirection == SORT_DIRECTION.NONE) {
		return <ArrowUpDown className='w-4 h-4 inline ml-1' />;
	} else if (sortDirection === SORT_DIRECTION.ASCENDING) {
		return <ArrowUp className='w-4 h-4 inline ml-1' />;
	} else {
		return <ArrowDown className='w-4 h-4 inline ml-1' />;
	}
};

const ItemTableColumn = (
	props: ItemTableHeaderRowProps & {
		column: Column;
	},
) => {
	// Visibility is now controlled by visibleHeaders prop
	if (
		props.visibleHeaders &&
		!props.visibleHeaders.includes(props.column.key)
	)
		return null;
	return (
		<Button
			variant='ghost'
			onClick={() => props.onSortClick(props.column.key)}
			className='font-semibold p-0'
		>
			{props.column.name}{' '}
			{getSortIcon(
				props.column.key,
				props.sortField,
				props.sortDirection,
			)}
		</Button>
	);
};

export const ItemTableHeaderRow = (props: ItemTableHeaderRowProps) => (
	<tr className='border-b bg-muted/50'>
		{tableColumns.map((column) =>
			!props.visibleHeaders ||
			props.visibleHeaders.includes(column.key) ? (
				<th key={column.key} className='py-1 text-center'>
					<ItemTableColumn {...props} column={column} />
				</th>
			) : null,
		)}
	</tr>
);

export default ItemTableHeaderRow;
