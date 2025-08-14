export const TOOL_TYPES = {
	NONE: 'None',
	AXE: 'Axe',
	PICKAXE: 'Pickaxe',
	KNIFE: 'Knife',
	ADZE: 'Adze',
	BUCKET: 'Bucket',
	STIRRING_TOOL: 'StirringTool',
	FISHING_NET: 'FishingNet',
	SEED_BAG: 'SeedBag',
	HAMMER: 'Hammer',
	MELEE_WEAPON: 'MeleeWeapon',
	RANGED_WEAPON: 'RangedWeapon',
} as const;

export type ToolType = (typeof TOOL_TYPES)[keyof typeof TOOL_TYPES];
