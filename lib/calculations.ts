import { ALL_ITEMS } from './item-store';
import { TOOL_MULTIPLIERS } from './tool-multipliers';
import { Item } from './types/item-types';

const calculateTrueMaxAmt = (item: Item): number => {
	return (item.productionLimit * item.baseAmtProduced * TOOL_MULTIPLIERS[item.toolType || 'None']);
};

export const calculateWorkerCost = (item: Item): number => {
	// Base worker cost is always 1
	let totalWorkerCost = 1;

	// Calculate additional worker cost from ingredients
	for (const ingredient of item.ingredients) {
		if ('classification' in ingredient) {
			// Skip classification-based ingredients for now
			// at some point this should search the items list for all items matching the classification
			// and select the one with the lowest worker cost
			continue;
		}
		const ingredientItem = ALL_ITEMS.find(
			(i) => i.name === ingredient.name,
		);
		if (!ingredientItem) continue;

		// Calculate how many of this ingredient we need for max production
		const totalIngredientNeeded = ingredient.quantity * item.productionLimit;

		// Calculate worker cost for this ingredient (recursive)
		const ingredientItemsPerWorker =
			calculateItemsPerWorker(ingredientItem);

		// Calculate how many workers we need to produce the required ingredients
		const workersNeededForIngredient =
			totalIngredientNeeded / ingredientItemsPerWorker;

		totalWorkerCost += workersNeededForIngredient;
	}

	return totalWorkerCost;
};

export const calculateItemsPerWorker = (item: Item): number => {
	return calculateTrueMaxAmt(item) / calculateWorkerCost(item);
};

export const calculateNeedsPerWorker = (item: Item): number => {
	if (!item.needType || !item.needValue || item.needValue === 0) {
		return 0;
	}

	return (
		item.needValue *
		calculateItemsPerWorker(item)
	);
};
