/**
 * @author WMXPY
 * @namespace Engine_Storage
 * @description Storage Engine
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { MiphaBlock } from "../../structure/block/block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../../structure/diverse/diverse-type";

export abstract class MiphaStorageEngine {

    private readonly _engineIdentifier: string;

    protected constructor() {

        this._engineIdentifier = UUIDVersion1.generate().toString();
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
