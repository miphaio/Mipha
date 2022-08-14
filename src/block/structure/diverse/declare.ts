/**
 * @author WMXPY
 * @namespace Block_Structure_Diverse
 * @description Declare
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { MiphaBlockDiverseMarkdown } from "./markdown/declare";

// Public
export type MiphaBlockDiverseStructureMap = {

    [MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN]: MiphaBlockDiverseMarkdown;
    [MIPHA_BLOCK_DIVERSE_TYPE.UNKNOWN]: never;
};

// Public
export type MiphaBlockDiverseStructure<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    MiphaBlockDiverseStructureMap[Type];