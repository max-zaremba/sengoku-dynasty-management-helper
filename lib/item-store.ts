import { Item, ITEM_CLASSIFICATIONS, NEED_TYPES } from './types/item-types';
import { TOOL_TYPES } from './types/tool-types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_SEASONAL_AVAILABILITY = {
	spring: true,
	summer: true,
	autumn: true,
	winter: true,
};

const MEALS_ITEMS: (Item & { needType: typeof NEED_TYPES.MEALS })[] = [
	{
		name: 'Rice',
		productionLimit: 23,
		baseAmtProduced: 16,
		ingredients: [],
		needType: NEED_TYPES.MEALS,
		needValue: 1,
		toolType: TOOL_TYPES.SEED_BAG,
		classification: ITEM_CLASSIFICATIONS.CEREAL,
		itemPrice: {
			buyPrice: 2,
			sellPrice: 1,
		},
		seasonalAvailability: {
			spring: true,
			summer: true,
			autumn: true,
			winter: false,
		},
	},
	{
		name: 'Lotus Root',
		productionLimit: 23,
		baseAmtProduced: 1,
		ingredients: [],
		needType: NEED_TYPES.MEALS,
		needValue: 3,
		toolType: TOOL_TYPES.SEED_BAG,
		classification: ITEM_CLASSIFICATIONS.VEGETABLE,
		itemPrice: {
			buyPrice: 10,
			sellPrice: 5,
		},
		seasonalAvailability: {
			spring: false,
			summer: true,
			autumn: false,
			winter: false,
		},
	},
	// ----------------------------------------------
];

export const ALL_ITEMS: Item[] = MEALS_ITEMS;
