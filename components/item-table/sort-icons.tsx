import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import React from 'react';
import { ColumnKey } from '@/lib/columns';
import { SortDirection, SORT_DIRECTION } from '@/lib/types/sort-types';

export const getSortIcon = (
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
