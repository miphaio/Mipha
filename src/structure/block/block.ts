/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Block
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { MiphaBlockDiverseMarkdown } from "./diverse/markdown/declare";

export type MiphaBlock<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    MiphaBlockDiverse<Type>
    & MiphaBlockBase;

export type MiphaBlockDiverseMap = {

    [MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN]: MiphaBlockDiverseMarkdown;
    [MIPHA_BLOCK_DIVERSE_TYPE.UNKNOWN]: never;
};

export type MiphaBlockDiverse<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    MiphaBlockDiverseMap[Type];

export type MiphaBlockBase = {

    readonly identifier: string;
    readonly histories: string[];

    readonly type: MIPHA_BLOCK_DIVERSE_TYPE;
};
