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
		columnKey: ColumnKey;
	},
) => {
	return (
		<Button
			variant='ghost'
			onClick={() => props.sortClickHandler(props.columnKey)}
			className='text-lg font-semibold p-0'
		>
			{props.column.name}{' '}
			<SortIcon
				columnKey={props.columnKey}
				sortField={props.sortField}
				sortDirection={props.sortDirection}
			/>
		</Button>
	);
};

export const ItemTableHeaderRow = (props: ItemTableHeaderRowProps) => (
	<tr className='border-b bg-muted/50'>
		{props.visibleHeaders?.map((key) => {
			if (!props.visibleHeaders?.includes(key)) return null;
			return (
				<th key={key} className='py-1 text-center'>
					<ItemTableColumn {...props} column={tableColumns[key]} columnKey={key} />
				</th>
			);
		})}
	</tr>
);

export default ItemTableHeaderRow;
