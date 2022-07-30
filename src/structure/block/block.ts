/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Block
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { MiphaBlockDiverseMarkdown } from "./diverse/markdown/declare";

export type MiphaBlock<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    & MiphaBlockDiverse<Type>
    & MiphaBlockBase;

export type MiphaBlockDiverseMap = {

    [MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN]: MiphaBlockDiverseMarkdown;
    [MIPHA_BLOCK_DIVERSE_TYPE.UNKNOWN]: never;
};

export type MiphaBlockDiverse<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    MiphaBlockDiverseMap[Type];

export type MiphaBlockBaseIdentifier = {

    readonly identifier: string;
};

export type MiphaBlockBaseHistories = {

    readonly histories: string[];
};

export type MiphaBlockBaseType = {

    readonly type: MIPHA_BLOCK_DIVERSE_TYPE;
};

export type MiphaBlockBase =
    & MiphaBlockBaseIdentifier
    & MiphaBlockBaseHistories
    & MiphaBlockBaseType;
