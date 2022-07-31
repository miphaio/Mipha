/**
 * @author WMXPY
 * @namespace Structure_Diverse
 * @description Declare
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { MiphaBlockDiverseMarkdown } from "./markdown/declare";

// Export
export type MiphaBlockDiverseMap = {

    [MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN]: MiphaBlockDiverseMarkdown;
    [MIPHA_BLOCK_DIVERSE_TYPE.UNKNOWN]: never;
};

// Export
export type MiphaBlockDiverse<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    MiphaBlockDiverseMap[Type];