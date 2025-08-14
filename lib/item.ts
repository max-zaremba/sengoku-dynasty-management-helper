import { ALL_ITEMS } from './item-store';
import {
	currentPerkMultiplier,
	currentToolMultipliers,
} from './production_multipliers';
import {
	Ingredient,
	ItemClassification,
	ItemPrice,
	NeedType,
	SeasonalAvailability,
} from './types/item-types';
import { ToolType } from './types/tool-types';

type ItemMetadata = {
	name: string;
	unitsOfProduction: number; // how many units of production can be produced per worker before any multipliers
	baseAmtProduced: number; // how many units of this item are produced per unit of production
	ingredients: Ingredient[]; // ingredients needed to produce this item
	needType: NeedType;
	needValue: number;
	toolType: ToolType;
	classification?: ItemClassification;
	itemPrice: ItemPrice;
	seasonalAvailability: SeasonalAvailability; // availability in each season (4 named boolens)
};

export class Item {
	itemMetadata: ItemMetadata;

	constructor(itemMetadata: ItemMetadata) {
		this.itemMetadata = itemMetadata;
	}

	// accessors for item metadata
	get ingredients(): Ingredient[] {
		return this.itemMetadata.ingredients;
	}

	get name(): string {
		return this.itemMetadata.name;
	}

	get needType(): NeedType {
		return this.itemMetadata.needType;
	}

	get unitsOfProduction(): number {
		return this.itemMetadata.unitsOfProduction;
	}

	get baseAmtProduced(): number {
		return this.itemMetadata.baseAmtProduced;
	}

	get toolType(): ToolType {
		return this.itemMetadata.toolType;
	}

	get needValue(): number {
		return this.itemMetadata.needValue;
	}

	get ingredientProductionLimit(): number {
		return this.unitsOfProduction * currentPerkMultiplier;
	}

	get trueProductionLimit(): number {
		return Math.floor(
			this.unitsOfProduction *
				this.baseAmtProduced *
				currentPerkMultiplier *
				currentToolMultipliers[this.toolType],
		);
	}

	get workerCost(): number {
		let totalWorkerCost = 1;

		for (const ingredient of this.ingredients) {
			if ('classification' in ingredient) {
				// Skip classification-based ingredients for now
				// at some point this should search the items list for all items matching the classification
				// and select the one with the lowest worker cost
				continue;
			}
			const ingredientItem = ALL_ITEMS.find(
				(item) => item.name === ingredient.name,
			);
			if (!ingredientItem) continue;

			// do not apply tool multiipliers to ingredients, since they are already applied in itemsPerWorker()
			// in the base calcuolations
			const totalIngredientNeeded =
				ingredient.quantity * this.ingredientProductionLimit;

			const ingredientItemsPerWorker = ingredientItem.itemsPerWorker;

			const workersNeededForIngredient =
				totalIngredientNeeded / ingredientItemsPerWorker;

			totalWorkerCost += workersNeededForIngredient;
		}

		return totalWorkerCost;
	}

	get itemsPerWorker(): number {
		return this.trueProductionLimit / this.workerCost;
	}

	get needsPerWorker(): number {
		if (!this.needType || !this.needValue) return 0;

		return this.needValue * this.itemsPerWorker;
	}
}
