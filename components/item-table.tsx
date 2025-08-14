"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
	calculateItemsPerWorker,
	calculateNeedsPerWorker,
	calculatePerkMultiplier,
	calculateTrueMaxAmt,
	calculateWorkerCost,
} from '@/lib/calculations';
import { ALL_ITEMS } from '@/lib/item-store';
import { Ingredient, Item } from '@/lib/types/item-types';
import ItemTableHeaderRow, { TableHeader, SortDirection, TABLE_HEADERS, SORT_DIRECTION } from './item-table-header-row';
import { exhaustiveSwitch } from '@/lib/utils';

const ItemNameCell = (props: { item: Item }) => {
	const name = props.item.name;
	const ingredients = props.item.ingredients;
	return (
		<div>
			<div className='font-medium'>{name}</div>
			{ingredients.length > 0 && (
				<div className='text-sm text-muted-foreground'>
					Requires:{' '}
					{ingredients
						.map((ingredient: Ingredient) => {
							if ('classification' in ingredient) {
								return `${ingredient.quantity} x Any ${ingredient.classification}`;
							}
							return `${ingredient.quantity} x ${ingredient.name}`;
						})
						.join(', ')}
				</div>
			)}
		</div>
	);
};

const MaxProductionCell = (props: { item: Item }) => {
	const maxProd = calculateTrueMaxAmt(props.item, calculatePerkMultiplier());
	return <div className='py-2'>{maxProd.toFixed(2)}</div>;
};

const TotalWorkerCostCell = (props: { item: Item }) => {
	const workerCost = calculateWorkerCost(props.item);
	return <div className='py-2'>{workerCost.toFixed(2)}</div>;
};

const ItemsPerWorkerCell = (props: { item: Item }) => {
	const itemsPerWorker = calculateItemsPerWorker(props.item);
	return <div className='py-2'>{itemsPerWorker.toFixed(2)}</div>;
};

const NeedsPerWorkerCell = (props: { item: Item }) => {
	const needsPerWorker = calculateNeedsPerWorker(props.item);
	return (
		<div className='py-2'>
			{needsPerWorker > 0 ? `${needsPerWorker.toFixed(2)}` : '-'}
		</div>
	);
};

const ItemNeedTypeCell = (props: { item: Item }) => {
	const needType = props.item.needType;
	return <div className='py-2'>{needType != 'None' ? needType : '-'}</div>;
};

const applySort = (items: Item[], sortField: TableHeader | undefined, sortDirection: SortDirection) => {
	if (!sortField || !sortDirection) {
		return items;
	}
	return [...items].sort((a, b) => {
		let aValue: string | number = '';
		let bValue: string | number = '';
		switch (sortField) {
			case TABLE_HEADERS.NAME:
				aValue = a.name;
				bValue = b.name;
				break;
			case TABLE_HEADERS.MAX_PRODUCTION:
				aValue = calculateTrueMaxAmt(a, calculatePerkMultiplier());
				bValue = calculateTrueMaxAmt(b, calculatePerkMultiplier());
				break;
			case TABLE_HEADERS.TOTAL_WORKER_COST:
				aValue = calculateWorkerCost(a);
				bValue = calculateWorkerCost(b);
				break;
			case TABLE_HEADERS.ITEMS_PER_WORKER:
				aValue = calculateItemsPerWorker(a);
				bValue = calculateItemsPerWorker(b);
				break;
			case TABLE_HEADERS.NEEDS_PER_WORKER:
				aValue = calculateNeedsPerWorker(a);
				bValue = calculateNeedsPerWorker(b);
				break;
			case TABLE_HEADERS.NEED_TYPE:
				aValue = a.needType;
				bValue = b.needType;
				break;
			default:
				exhaustiveSwitch(sortField, `Found unexpected sort field ${sortField}.`);
		}
		if (typeof aValue === 'string' && typeof bValue === 'string') {
			return sortDirection === SORT_DIRECTION.ASCENDING
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}
		return sortDirection === SORT_DIRECTION.ASCENDING
			? (aValue as number) - (bValue as number)
			: (bValue as number) - (aValue as number);
	})
};
// Table component to display items, items per worker, and needs per worker
export const ItemTable = () => {
	const [sortField, setSortField] = useState<TableHeader | undefined>(TABLE_HEADERS.NEEDS_PER_WORKER);
	const [sortDirection, setSortDirection] = useState<SortDirection>(SORT_DIRECTION.DESCENDING);

	const handleSort = (field: TableHeader) => {
		if (sortField === field) {
			if (sortDirection === SORT_DIRECTION.DESCENDING) {
				setSortDirection(SORT_DIRECTION.ASCENDING);
			}
			else {
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
				<CardTitle style={{ color: '#e6e6e6' }}>Items Production Table</CardTitle>
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
										<MaxProductionCell item={item} />
									</td>
									<td className='px-4 py-2'>
										<TotalWorkerCostCell item={item} />
									</td>
									<td className='px-4 py-2'>
										<ItemsPerWorkerCell item={item} />
									</td>
									<td className='px-4 py-2'>
										<NeedsPerWorkerCell item={item} />
									</td>
									<td className='px-4 py-2'>
										<ItemNeedTypeCell item={item} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}

export default ItemTable;
