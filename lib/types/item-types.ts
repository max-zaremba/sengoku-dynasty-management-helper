import { ToolType } from "../tool-multipliers";

type seasonalAvailability = {
  spring: boolean;
  summer: boolean;
  autumn: boolean;
  winter: boolean;
};

type ItemPrice = {
  buyPrice: number;
  sellPrice: number;
  difficultyMultiplier?: number;
  perkMultiplier?: number;
};

type NeedType =
  | "Meals"
  | "Heating"
  | "Beverages"
  | "Maintenance"
  | "Health"
  | "Security"
  | "Spiritual"
  | "Luxury"
  | "None";

// TODO: Complete
type ItemClassification =
  | "Bean"
  | "Raw Food"
  | "Herb"
  | "Vegetable"
  | "Fruit"
  | "Grain"
  | "Meat"
  | "Fish"
  | "Resource";

export type Ingredient =
  | { name: string; quantity: number }
  | { classification: string; quantity: number };

export type Item = {
  name: string;
  maxProduction: number;
  ingredients: Ingredient[];
  needType: NeedType;
  needValue: number;
  toolType: ToolType;
  classification?: ItemClassification;
  itemPrice: ItemPrice;
  seasonalAvailability: seasonalAvailability;
};
