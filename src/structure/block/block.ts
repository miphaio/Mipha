/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Block
 */

import { MiphaBlockDiverseStructure } from "../diverse/declare";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../diverse/diverse-type";

export type MiphaBlock<Type extends MIPHA_BLOCK_DIVERSE_TYPE> =
    & MiphaBlockDiverseStructure<Type>
    & MiphaBlockBase;

export type MiphaBlockBaseIdentifier = {

    readonly identifier: string;
    readonly dataSourceIdentifier: string;
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
