/**
 * @author WMXPY
 * @namespace Engine_Storage
 * @description Storage Engine
 */

import { MiphaBlock } from "../../structure/block/block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../../structure/block/diverse-type";

export abstract class MiphaStorageEngine {

    protected constructor() {
    }

    public abstract loadBlock<Type extends MIPHA_BLOCK_DIVERSE_TYPE = MIPHA_BLOCK_DIVERSE_TYPE>(
        identifier: string,
    ): Promise<MiphaBlock<Type>>;

    public abstract saveBlock(
        block: MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE>,
    ): Promise<void>;

    public abstract deleteBlock(
        identifier: string,
    ): Promise<void>;
}
