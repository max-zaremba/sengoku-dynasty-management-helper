"use client"
import { Button } from './ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import React from 'react';

export const TABLE_HEADERS = {
    NAME: 'Item Name',
    MAX_PRODUCTION: 'Max Production',
    TOTAL_WORKER_COST: 'Total Worker Cost',
    ITEMS_PER_WORKER: 'Items/Worker',
    NEEDS_PER_WORKER: 'Needs/Worker',
    NEED_TYPE: 'Need Type',
} as const;
export type TableHeader = typeof TABLE_HEADERS[keyof typeof TABLE_HEADERS];

export const SORT_DIRECTION = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending',
    NONE: 'none',
} as const;
export type SortDirection = typeof SORT_DIRECTION[keyof typeof SORT_DIRECTION];

interface ItemTableHeaderRowProps {
    sortField: TableHeader | undefined;
    sortDirection: SortDirection;
    onSort: (field: TableHeader) => void;
}

const getSortIcon = (tableHeader: TableHeader, sortField: TableHeader | undefined, sortDirection: SortDirection) => {
    if (tableHeader !== sortField || sortDirection == SORT_DIRECTION.NONE) {
        return <ArrowUpDown className="w-4 h-4 inline ml-1" />;
    }
    else if (sortDirection === SORT_DIRECTION.ASCENDING) {
        return <ArrowUp className="w-4 h-4 inline ml-1" />;
    }
    else { // sortDirection === SORT_DIRECTION.DESC
        return <ArrowDown className="w-4 h-4 inline ml-1" />;
    }
}

const ItemTableHeader = (props: ItemTableHeaderRowProps & { tableHeader: TableHeader }) => {
    return <Button variant="ghost" onClick={() => props.onSort(props.tableHeader)} className="font-semibold p-0">
        {props.tableHeader} {getSortIcon(props.tableHeader, props.sortField, props.sortDirection)}
    </Button>
};

export const ItemTableHeaderRow = (props: ItemTableHeaderRowProps) => (
    <tr className="border-b bg-muted/50">
        {Object.values(TABLE_HEADERS).map((tableHeader) =>
            <th key={tableHeader} className="px-4 py-2 text-left">
                <ItemTableHeader {...props} tableHeader={tableHeader} />
            </th>
        )}
    </tr>
);

export default ItemTableHeaderRow;
