import { Item } from "./types/item-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_SEASONAL_AVAILABILITY = {
  spring: true,
  summer: true,
  autumn: true,
  winter: true,
};

const MEALS_ITEMS: (Item & { needType: "Meals" })[] = [
  {
    name: "Lotus Root",
    maxProduction: 23,
    ingredients: [],
    needType: "Meals",
    needValue: 3,
    toolType: "SeedBag",
    classification: "Vegetable",
    itemPrice: {
      buyPrice: 10,
      sellPrice: 5,
      difficultyMultiplier: 1,
      perkMultiplier: 1,
    },
    seasonalAvailability: {
      spring: false,
      summer: true,
      autumn: false,
      winter: false,
    },
  },
];

export const ALL_ITEMS: Item[] = MEALS_ITEMS;
