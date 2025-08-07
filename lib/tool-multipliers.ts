export type ToolType =
	| 'None'
	| 'Axe'
	| 'Pickaxe'
	| 'Knife'
	| 'Adze'
	| 'StirringTool'
	| 'FishingNet'
	| 'SeedBag'
	| 'Hammer'
	| 'MeleeWeapon'
	| 'RangedWeapon';

export const toolMultipliers: Record<ToolType, number> = {
	None: 1,
	Axe: 1.75,
	Pickaxe: 1.75,
	Knife: 1.75,
	Adze: 1.75,
	StirringTool: 1,
	FishingNet: 1,
	SeedBag: 1,
	Hammer: 1.75,
	MeleeWeapon: 2.5,
	RangedWeapon: 2.5,
};
