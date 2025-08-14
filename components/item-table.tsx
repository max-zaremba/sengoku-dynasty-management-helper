'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ALL_ITEMS } from '@/lib/item-store';
import { Ingredient } from '@/lib/types/item-types';
import ItemTableHeaderRow, {
	TableHeader,
	SortDirection,
	TABLE_HEADERS,
	SORT_DIRECTION,
} from './item-table-header-row';
import { exhaustiveSwitch } from '@/lib/utils';
import { Item } from '@/lib/item';

const ItemNameCell = (props: { item: Item }) => {
	return (
		<div>
			<div className='font-medium'>{props.item.name}</div>
			{props.item.ingredients.length > 0 && (
				<div className='text-sm text-muted-foreground'>
					Requires:{' '}
					{props.item.ingredients
						.map((ingredient: Ingredient) => {
							if ('classification' in ingredient) {
								return `${ingredient.quantity}x Any ${ingredient.classification}`;
							}
							return `${ingredient.quantity}x ${ingredient.name}`;
						})
						.join(', ')}
				</div>
			)}
		</div>
	);
};

const ItemNeedsPerWorkerCell = (props: { item: Item }) => {
	const needsPerWorker = props.item.needsPerWorker;
	return (
		<div>
			<div className='py-2'>
				{needsPerWorker > 0 ? `${needsPerWorker.toFixed(2)}` : '-'}
			</div>
			<div className='text-sm text-muted-foreground'></div>
		</div>
	);
};

const ItemNeedTypeCell = (props: { item: Item }) => {
	const needType = props.item.needType;
	return <div className='py-2'>{needType != 'None' ? needType : '-'}</div>;
};

const appliedComparison = (
	a: string | number,
	b: string | number,
	sortDirection: SortDirection,
): number => {
	if (typeof a === 'string' && typeof b === 'string') {
		return sortDirection === SORT_DIRECTION.ASCENDING
			? a.localeCompare(b)
			: b.localeCompare(a);
	}
	return sortDirection === SORT_DIRECTION.ASCENDING
		? (a as number) - (b as number)
		: (b as number) - (a as number);
};

const customNeedSortVal = (item: Item): number => {
	switch (item.needType) {
		case 'Meals':
			return 1;
		case 'Heating':
			return 2;
		case 'Beverages':
			return 3;
		case 'Maintenance':
			return 4;
		case 'Health':
			return 5;
		case 'Security':
			return 6;
		case 'Spiritual':
			return 7;
		case 'Luxury':
			return 8;
		default:
			return 9; // None or any other type
	}
};

const applySort = (
	items: Item[],
	sortField: TableHeader | undefined,
	sortDirection: SortDirection,
) => {
	if (!sortField || !sortDirection) {
		return items;
	}
	return [...items].sort((a, b) => {
		switch (sortField) {
			case TABLE_HEADERS.NAME:
				return appliedComparison(a.name, b.name, sortDirection);
			case TABLE_HEADERS.ITEMS_PER_WORKER:
				return appliedComparison(
					a.itemsPerWorker,
					b.itemsPerWorker,
					sortDirection,
				);
			case TABLE_HEADERS.NEEDS_PER_WORKER:
				return appliedComparison(
					a.needsPerWorker,
					b.needsPerWorker,
					sortDirection,
				);
			case TABLE_HEADERS.NEED_TYPE:
				return appliedComparison(
					customNeedSortVal(a),
					customNeedSortVal(b),
					sortDirection,
				);
			default:
				return exhaustiveSwitch(
					sortField,
					`Found unexpected sort field ${sortField}.`,
				);
		}
	});
};
// Table component to display items, items per worker, and needs per worker
export const ItemTable = () => {
	const [sortField, setSortField] = useState<TableHeader | undefined>(
		TABLE_HEADERS.NEEDS_PER_WORKER,
	);
	const [sortDirection, setSortDirection] = useState<SortDirection>(
		SORT_DIRECTION.DESCENDING,
	);

	const handleSort = (field: TableHeader) => {
		if (sortField === field) {
			if (sortDirection === SORT_DIRECTION.DESCENDING) {
				setSortDirection(SORT_DIRECTION.ASCENDING);
			} else {
				setSortDirection(SORT_DIRECTION.NONE);
				setSortField(undefined);
			}
		} else {
			setSortField(field);
			setSortDirection(SORT_DIRECTION.DESCENDING);
		}
	};

	const sortedItems = applySort(ALL_ITEMS, sortField, sortDirection);

	return (
		<Card style={{ background: '#002200', color: '#e6e6e6' }}>
			<CardHeader>
				<CardTitle style={{ color: '#e6e6e6' }}>
					Items Production Table
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='overflow-x-auto'>
					<table
						className='min-w-full divide-y divide-border'
						style={{ background: '#002200', color: '#e6e6e6' }}
					>
						<thead style={{ color: '#e6e6e6' }}>
							<ItemTableHeaderRow
								sortField={sortField}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
						</thead>
						<tbody>
							{sortedItems.map((item) => (
								<tr
									key={item.name}
									className='border-b last:border-0'
									style={{ color: '#e6e6e6' }}
								>
									<td className='px-4 py-2 font-medium'>
										<ItemNameCell item={item} />
									</td>
									<td className='px-4 py-2'>
										<ItemNeedTypeCell item={item} />
									</td>
									<td className='px-4 py-2'>
										<ItemNeedsPerWorkerCell item={item} />
									</td>
									<td className='px-4 py-2'>
										<div className='py-2'>
											{item.itemsPerWorker.toFixed(2)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
};

export default ItemTable;
