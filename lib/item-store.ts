import { Item } from './item';
import { ITEM_CLASSIFICATIONS, NEED_TYPES } from './types/item-types';
import { TOOL_TYPES } from './types/tool-types';

const DEFAULT_SEASONAL_AVAILABILITY = {
	spring: true,
	summer: true,
	autumn: true,
	winter: true,
};

const MEALS_ITEMS: Item[] = [
	new Item({
		name: 'Rice',
		unitsOfProduction: 20,
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
	}),
	new Item({
		name: 'Lotus Root',
		unitsOfProduction: 20,
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
	}),
	new Item({
		name: 'Cooked Rice (Barrel)',
		unitsOfProduction: 50,
		baseAmtProduced: 1,
		ingredients: [
			{ name: 'Rice', quantity: 8 },
			{ name: 'Water', quantity: 1 },
			{ name: 'Firewood', quantity: 1 },
		],
		needType: NEED_TYPES.MEALS,
		needValue: 24,
		toolType: TOOL_TYPES.STIRRING_TOOL,
		classification: ITEM_CLASSIFICATIONS.CONSUMABLE,
		itemPrice: {
			buyPrice: 30,
			sellPrice: 15,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}),
	new Item({
		name: 'Raw Fish',
		unitsOfProduction: 66,
		baseAmtProduced: 1,
		ingredients: [],
		needType: NEED_TYPES.MEALS,
		needValue: 4,
		toolType: TOOL_TYPES.FISHING_NET,
		classification: ITEM_CLASSIFICATIONS.CONSUMABLE,
		itemPrice: {
			buyPrice: 20,
			sellPrice: 10,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}),
	new Item({
		name: 'Narezushi',
		unitsOfProduction: 57,
		baseAmtProduced: 1,
		ingredients: [
			{ name: 'Cooked Rice (Barrel)', quantity: 1 },
			{ name: 'Raw Fish', quantity: 1 },
		],
		needType: NEED_TYPES.MEALS,
		needValue: 54,
		toolType: TOOL_TYPES.NONE,
		classification: ITEM_CLASSIFICATIONS.CONSUMABLE,
		itemPrice: {
			buyPrice: 110,
			sellPrice: 55,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}),
];

const BEVERAGES_ITEMS: Item[] = [
	new Item({
		name: 'Water',
		unitsOfProduction: 150,
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
	}),
];

const HEATING_ITEMS: Item[] = [
	new Item({
		name: 'Firewood',
		unitsOfProduction: 33,
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
	}),
];

const RESOURCES_ITEMS: Item[] = [
	new Item({
		name: 'Log (Conifer/Deciduous)',
		unitsOfProduction: 33,
		baseAmtProduced: 1,
		ingredients: [],
		needType: NEED_TYPES.NONE,
		needValue: 0,
		toolType: TOOL_TYPES.AXE,
		classification: ITEM_CLASSIFICATIONS.RESOURCE,
		itemPrice: {
			buyPrice: 5.2,
			sellPrice: 1.3,
		},
		seasonalAvailability: DEFAULT_SEASONAL_AVAILABILITY,
	}),
];

export const ALL_ITEMS: Item[] = [
	...MEALS_ITEMS,
	...BEVERAGES_ITEMS,
	...HEATING_ITEMS,
	...RESOURCES_ITEMS,
];
