'use client';
import React, { useState } from 'react';
import { ALL_ITEMS } from '@/lib/item-store';
import { Ingredient } from '@/lib/types/item-types';
import ItemTableHeaderRow from './item-table-header-row';
import { ColumnKey, tableColumns } from '@/lib/columns';
import { Item } from '@/lib/item';
import { SORT_DIRECTION, SortDirection } from '@/lib/types/sort-types';

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

const applySort = (
	items: Item[],
	sortField: ColumnKey | undefined,
	sortDirection: SortDirection,
) => {
	if (!sortField || !sortDirection) {
		return items;
	}
	const column = tableColumns.find((col) => col.key === sortField);
	if (!column) return items;
	return [...items].sort((a, b) => column.sortFunc(a, b, sortDirection));
};

export const ItemTable = (props: { devMode: boolean }) => {
	const [sortField, setSortField] = useState<ColumnKey | undefined>(
		'NEEDS_PER_WORKER',
	);
	const [sortDirection, setSortDirection] = useState<SortDirection>(
		SORT_DIRECTION.DESCENDING,
	);

	const sortClickHandler = (field: ColumnKey) => {
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

	const visibleHeaders = tableColumns
		.filter((col) => props.devMode || !col.devOnly)
		.map((col) => col.key);

	return (
		<div className='overflow-x-auto bg-green-950 border rounded-xl py-3'>
			<h2
				className='text-2xl text-center font-bold underline py-2 -mt-3 -ml-3'
			>
				Needs Chart
			</h2>
			<table className='bg-green-950 text-white min-w-full'>
				<thead className='text-white'>
					<ItemTableHeaderRow
						sortField={sortField}
						sortDirection={sortDirection}
						sortClickHandler={sortClickHandler}
						visibleHeaders={visibleHeaders}
					/>
				</thead>
				<tbody>
					{sortedItems.map((item) => (
						<tr
							key={item.name}
							className='text-white border-b last:border-0'
						>
							{visibleHeaders.includes('NAME') && (
								<td className='px-6 py-2'>
									<ItemNameCell item={item} />
								</td>
							)}
							{visibleHeaders.includes('NEED_TYPE') && (
								<td className='px-6 py-2'>
									<ItemNeedTypeCell item={item} />
								</td>
							)}
							{visibleHeaders.includes(
								'NEEDS_PER_WORKER',
							) && (
									<td className='px-6 py-2'>
										<ItemNeedsPerWorkerCell item={item} />
									</td>
								)}
							{visibleHeaders.includes(
								'ITEMS_PER_WORKER',
							) && (
									<td className='px-6 py-2'>
										<div className='py-2'>
											{item.itemsPerWorker.toFixed(2)}
										</div>
									</td>
								)}
							{visibleHeaders.includes(
								'TRUE_PRODUCTION_LIMIT',
							) && (
									<td className='px-6 py-2'>
										<div className='py-2'>
											{item.trueProductionLimit}
										</div>
									</td>
								)}
							{visibleHeaders.includes('WORKER_COST') && (
								<td className='px-6 py-2'>
									<div className='py-2'>
										{item.workerCost.toFixed(2)}
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ItemTable;
