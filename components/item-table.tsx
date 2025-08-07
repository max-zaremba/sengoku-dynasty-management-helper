import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
	calculateItemsPerWorker,
	calculateNeedsPerWorker,
} from '@/lib/calculations';
import { ALL_ITEMS } from '@/lib/item-store';
import { Ingredient, Item } from '@/lib/types/item-types';

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

const ItemsPerWorkerCell = (props: { item: Item }) => {
	const itemsPerWorker = calculateItemsPerWorker(props.item);
	return (
		<div className='py-2'>
			{itemsPerWorker.toFixed(2)}
		</div>
	);
}

const NeedsPerWorkerCell = (props: { item: Item }) => {
	const needsPerWorker = calculateNeedsPerWorker(props.item);

	return (
		<div className='py-2'>
			{needsPerWorker > 0
				? `${needsPerWorker.toFixed(2)}`
				: '-'}
		</div>
	);
}

const ItemNeedTypeCell = (props: { item: Item }) => {
	const needType = props.item.needType
	return (
		<div className='py-2'>
			{needType != "None"
				? needType
				: '-'}
		</div>
	);
}

// Table component to display items, items per worker, and needs per worker
export function ItemTable() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Items Production Table</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-border'>
						<thead>
							<tr>
								<th className='px-4 py-2 text-left'>Item Name</th>
								<th className='px-4 py-2 text-left'>Items/Worker</th>
								<th className='px-4 py-2 text-left'>Needs/Worker</th>
								<th className='px-4 py-2 text-left'>Need Type</th>
							</tr>
						</thead>
						<tbody>
							{ALL_ITEMS.map((item) => (
								<tr
									key={item.name}
									className='border-b last:border-0'
								>
									<td className='px-4 py-2 font-medium'>
										<ItemNameCell item={item} />
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
