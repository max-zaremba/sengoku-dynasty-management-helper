import { ALL_ITEMS } from './item-store';
import { Perk, PERK_MULTIPLIERS, TOOL_MULTIPLIERS } from './production_multipliers';
import { Item } from './types/item-types';

const currentPerkLevels = 3; // this will be dynamic based on player perk level
export const calculatePerkMultiplier = (): number => {
	return Object.values(PERK_MULTIPLIERS).reduce((acc: number, perk: Perk) => acc * perk[currentPerkLevels], 1);
};

export const calculateTrueMaxAmt = (item: Item, perkMultiplier: number): number => {
	const baseProduction = item.productionLimit * item.baseAmtProduced;
	const toolMultiplier = TOOL_MULTIPLIERS[item.toolType || 'None'];
	return Math.floor(baseProduction * (perkMultiplier ?? calculatePerkMultiplier()) * toolMultiplier);
};
const calculateIngredientWorkerCost = (ingredient: { name: string; quantity: number }, maxProducibleWithMultipliers: number): number => {
	const ingredientItem = ALL_ITEMS.find((i) => i.name === ingredient.name);
	if (!ingredientItem) return 0;

	// Calculate how many of this ingredient we need for max production
	const totalIngredientNeeded = ingredient.quantity * maxProducibleWithMultipliers;

	// Calculate worker cost for this ingredient (recursive)
	const ingredientItemsPerWorker =
		calculateItemsPerWorker(ingredientItem);

	// Calculate how many workers we need to produce the required ingredients
	const workersNeededForIngredient =
		totalIngredientNeeded / ingredientItemsPerWorker;

	return workersNeededForIngredient;
};

export const calculateWorkerCost = (item: Item): number => {
	// Base worker cost is always 1
	let totalWorkerCost = 1;
	const maxProducibleWithMultipliers = item.productionLimit * calculatePerkMultiplier();

	// Calculate additional worker cost from ingredients
	for (const ingredient of item.ingredients) {
		if ('classification' in ingredient) {
			// Skip classification-based ingredients for now
			// at some point this should search the items list for all items matching the classification
			// and select the one with the lowest worker cost
			continue;
		}
		const workersNeededForIngredient = calculateIngredientWorkerCost(ingredient, maxProducibleWithMultipliers);

		totalWorkerCost += workersNeededForIngredient;
	}

	return totalWorkerCost;
};

export const calculateItemsPerWorker = (item: Item): number => {
	return calculateTrueMaxAmt(item, calculatePerkMultiplier()) / calculateWorkerCost(item);
};

export const calculateNeedsPerWorker = (item: Item): number => {
	if (!item.needType || !item.needValue) {
		return 0;
	}

	return (
		item.needValue *
		calculateItemsPerWorker(item)
	);
};
