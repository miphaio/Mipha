/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Diverse Helper
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { MiphaBlock } from "../block/block";
import { MiphaBlockDiverseStructure } from "./declare";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";

// Public
export abstract class MiphaBlockDiverseHelper<Type extends MIPHA_BLOCK_DIVERSE_TYPE> {

    public abstract readonly type: Type;

    public abstract generateHistoryHash(diverse: MiphaBlockDiverseStructure<Type>): string;

    public create(diverse: MiphaBlockDiverseStructure<Type>): MiphaBlock<Type> {

        const identifier: string = UUIDVersion1.generate().toString();

        return this.createPrecise(identifier, diverse);
    }

    public createPrecise(identifier: string, diverse: MiphaBlockDiverseStructure<Type>): MiphaBlock<Type> {

        const initialHistory: string = this.generateHistoryHash(diverse);

        return {
            identifier,
            histories: [initialHistory],
            type: this.type,
            ...diverse,
        };
    }
}
