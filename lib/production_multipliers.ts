import { TOOL_TYPES, ToolType } from "./types/tool-types";

export const TOOL_MULTIPLIERS: Record<ToolType, number> = {
	[TOOL_TYPES.NONE]: 1,
	[TOOL_TYPES.AXE]: 1.74,
	[TOOL_TYPES.PICKAXE]: 1.75,
	[TOOL_TYPES.KNIFE]: 1.75,
	[TOOL_TYPES.ADZE]: 1.75,
	[TOOL_TYPES.BUCKET]: 1,
	[TOOL_TYPES.STIRRING_TOOL]: 1,
	[TOOL_TYPES.FISHING_NET]: 1,
	[TOOL_TYPES.SEED_BAG]: 1,
	[TOOL_TYPES.HAMMER]: 1.75,
	[TOOL_TYPES.MELEE_WEAPON]: 2.5,
	[TOOL_TYPES.RANGED_WEAPON]: 2.5,
};

export type Perk = Record<number, number>;  // level to multipleier
export const PERK_MULTIPLIERS: Record<string, Perk> = {
	WORKER_PRODUCTIVITY_TRAINING: {
		0: 1,
		1: 1.05,
		2: 1.1,
		3: 1.15
	}
}