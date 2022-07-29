/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Block
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { MiphaBlockDiverseMarkdown } from "./diverse/markdown";

export type MiphaBlock<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    & MiphaBlockDiverse<Type>
    & MiphaBlockBase;

export type MiphaBlockDiverse<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    Type extends MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN ? MiphaBlockDiverseMarkdown :
    never;

export type MiphaBlockBase = {

    readonly identifier: string;

    readonly type: MIPHA_BLOCK_DIVERSE_TYPE;
};