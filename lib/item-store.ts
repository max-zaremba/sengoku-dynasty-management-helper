import { Item, ITEM_CLASSIFICATIONS, NEED_TYPES } from './types/item-types';
import { TOOL_TYPES } from './types/tool-types';

const DEFAULT_SEASONAL_AVAILABILITY = {
	spring: true,
	summer: true,
	autumn: true,
	winter: true,
};

const MEALS_ITEMS: (Item & { needType: typeof NEED_TYPES.MEALS })[] = [
	{
		name: 'Rice',
		productionLimit: 20,
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
		productionLimit: 20,
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
	{
		name: 'Cooked Rice (Barrel)',
		productionLimit: 50,
		baseAmtProduced: 1,
		ingredients: [{ name: 'Rice', quantity: 8 }, { name: 'Water', quantity: 1 }, { name: 'Firewood', quantity: 1 }],
		needType: NEED_TYPES.MEALS,
		needValue: 24,
		toolType: TOOL_TYPES.STIRRING_TOOL,
		classification: ITEM_CLASSIFICATIONS.CONSUMABLE,
		itemPrice: {
			buyPrice: 30,
			sellPrice: 15,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}
];

const BEVERAGES_ITEMS: (Item & { needType: typeof NEED_TYPES.BEVERAGES })[] = [
	{
		name: 'Water',
		productionLimit: 150,
		baseAmtProduced: 1,
		ingredients: [],
		needType: NEED_TYPES.BEVERAGES,
		needValue: 4,
		toolType: TOOL_TYPES.BUCKET,
		classification: ITEM_CLASSIFICATIONS.RESOURCE,
		itemPrice: {
			buyPrice: 3.5,
			sellPrice: 0.04,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}
];

const HEATING_ITEMS: (Item & { needType: typeof NEED_TYPES.HEATING })[] = [
	{
		name: 'Firewood',
		productionLimit: 33,
		baseAmtProduced: 8,
		ingredients: [{ name: 'Log (Conifer/Deciduous)', quantity: 1 }],
		needType: NEED_TYPES.HEATING,
		needValue: 5,
		toolType: TOOL_TYPES.AXE,
		classification: ITEM_CLASSIFICATIONS.INTERMEDIATE_RESOURCE,
		itemPrice: {
			buyPrice: 1.5,
			sellPrice: 0.25,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}
];

const RESOURCES_ITEMS: (Item & { needType: typeof NEED_TYPES.NONE })[] = [
	{
		name: 'Log (Conifer/Deciduous)',
		productionLimit: 33,
		baseAmtProduced: 1,
		ingredients: [],
		needType: NEED_TYPES.NONE,
		needValue: 0,
		toolType: TOOL_TYPES.AXE,
		classification: ITEM_CLASSIFICATIONS.RESOURCE,
		itemPrice: {
			buyPrice: 5.20,
			sellPrice: 1.30,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}
];

export const ALL_ITEMS: Item[] = [...MEALS_ITEMS, ...BEVERAGES_ITEMS, ...HEATING_ITEMS, ...RESOURCES_ITEMS];
