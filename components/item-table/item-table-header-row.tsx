'use client';

import { Column, ColumnKey, tableColumns } from '@/lib/columns';
import { Button } from '../ui/button';
import React from 'react';
import { SortDirection } from '@/lib/types/sort-types';
import { SortIcon } from './sort-icons';

interface ItemTableHeaderRowProps {
	sortField: ColumnKey | undefined;
	sortDirection: SortDirection;
	sortClickHandler: (field: ColumnKey) => void;
	visibleHeaders?: ColumnKey[];
}

const ItemTableColumn = (
	props: ItemTableHeaderRowProps & {
		column: Column;
	},
) => {
	return (
		<Button
			variant='ghost'
			onClick={() => props.sortClickHandler(props.column.key)}
			className='text-lg font-semibold p-0'
		>
			{props.column.name}{' '}
			<SortIcon
				columnKey={props.column.key}
				sortField={props.sortField}
				sortDirection={props.sortDirection}
			/>
		</Button>
	);
};

export const ItemTableHeaderRow = (props: ItemTableHeaderRowProps) => (
	<tr className='border-b bg-muted/50'>
		{tableColumns.map((column) => {
			if (!props.visibleHeaders?.includes(column.key)) return null;

			return (
				<th key={column.key} className='py-1 text-center'>
					<ItemTableColumn {...props} column={column} />
				</th>
			);
		})}
	</tr>
);

export default ItemTableHeaderRow;
