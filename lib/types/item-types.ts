import { ToolType } from "./tool-types";


type seasonalAvailability = {
	spring: boolean;
	summer: boolean;
	autumn: boolean;
	winter: boolean;
};

type ItemPrice = {
	buyPrice: number;
	sellPrice: number;
};
export const NEED_TYPES = {
	MEALS: 'Meals',
	HEATING: 'Heating',
	BEVERAGES: 'Beverages',
	MAINTENANCE: 'Maintenance',
	HEALTH: 'Health',
	SECURITY: 'Security',
	SPIRITUAL: 'Spiritual',
	LUXURY: 'Luxury',
	NONE: 'None',
} as const;

export type NeedType = typeof NEED_TYPES[keyof typeof NEED_TYPES];

// TODO: Complete
export const ITEM_CLASSIFICATIONS = {
	BEAN: 'Bean',
	RAW_FOOD: 'Raw Food',
	HERB: 'Herb',
	VEGETABLE: 'Vegetable',
	FRUIT: 'Fruit',
	GRAIN: 'Grain',
	MEAT: 'Meat',
	FISH: 'Fish',
	CEREAL: 'Cereal',
	RESOURCE: 'Resource',
	INTERMEDIATE_RESOURCE: 'Intermediate Resource',
	CONSUMABLE: 'Consumable',
} as const;

export type ItemClassification = typeof ITEM_CLASSIFICATIONS[keyof typeof ITEM_CLASSIFICATIONS];

export type Ingredient =
	| { name: string; quantity: number }
	| { classification: string; quantity: number };

export type Item = {
	name: string;
	productionLimit: number; // how many units of production can be produced per worker before any multipliers
	baseAmtProduced: number; // how many units of this item are produced per unit of production
	ingredients: Ingredient[]; // ingredients needed to produce this item
	needType: NeedType;
	needValue: number;
	toolType: ToolType;
	classification?: ItemClassification;
	itemPrice: ItemPrice;
	seasonalAvailability: seasonalAvailability; // availability in each season (4 named boolens)
};
