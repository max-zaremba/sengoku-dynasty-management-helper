import { Item } from '@/lib/item';
import { ItemSortFunction, SortDirection } from './types/sort-types';

export type Column = {
	name: string;
	sortFunc: ItemSortFunction;
	devOnly?: boolean;
};

export const tableColumns = {
	NAME: {
		name: 'Item Name',
		sortFunc: (a: Item, b: Item, sortDirection: SortDirection) => {
			return sortDirection === 'ascending'
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		},
	},
	TRUE_PRODUCTION_LIMIT: {
		name: 'True Production Limit',
		sortFunc: (a: Item, b: Item, sortDirection: SortDirection) => {
			return sortDirection === 'ascending'
				? a.trueProductionLimit - b.trueProductionLimit
				: b.trueProductionLimit - a.trueProductionLimit;
		},
		devOnly: true,
	},
	WORKER_COST: {
		name: 'Worker Cost',
		sortFunc: (a: Item, b: Item, sortDirection: SortDirection) => {
			return sortDirection === 'ascending'
				? a.workerCost - b.workerCost
				: b.workerCost - a.workerCost;
		},
		devOnly: true,
	},
	NEED_TYPE: {
		name: 'Need Type',
		sortFunc: (a: Item, b: Item, sortDirection: SortDirection) => {
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
						return 9;
				}
			};
			return sortDirection === 'ascending'
				? customNeedSortVal(a) - customNeedSortVal(b)
				: customNeedSortVal(b) - customNeedSortVal(a);
		},
	},
	NEEDS_PER_WORKER: {
		name: 'Needs/Worker',
		sortFunc: (a: Item, b: Item, sortDirection: SortDirection) => {
			return sortDirection === 'ascending'
				? a.needsPerWorker - b.needsPerWorker
				: b.needsPerWorker - a.needsPerWorker;
		},
	},
	ITEMS_PER_WORKER: {
		name: 'Items/Worker',
		sortFunc: (a: Item, b: Item, sortDirection: SortDirection) => {
			return sortDirection === 'ascending'
				? a.itemsPerWorker - b.itemsPerWorker
				: b.itemsPerWorker - a.itemsPerWorker;
		},
	},
} as const;

export type ColumnKey = keyof typeof tableColumns;
