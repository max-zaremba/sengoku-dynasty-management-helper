import { Item } from "../item";

export const SORT_DIRECTION = {
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
	NONE: 'none',
} as const;

export type SortDirection =
	(typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION];

export type ItemSortFunction = (a: Item, b: Item, sortDirection: SortDirection) => number;