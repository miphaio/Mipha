/**
 * @author WMXPY
 * @namespace Block_Structure_Block
 * @description Diverse Helper
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { MiphaBlock } from "../block/block";
import { MiphaDataSource } from "../data-source/data-source";
import { MiphaBlockDiverseStructure } from "./declare";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";

// Public
export abstract class MiphaBlockDiverseHelper<Type extends MIPHA_BLOCK_DIVERSE_TYPE> {

    public abstract readonly type: Type;

    public create(
        dataSource: MiphaDataSource,
        diverse: MiphaBlockDiverseStructure<Type>,
    ): MiphaBlock<Type> {

        const identifier: string = UUIDVersion1.generate().toString();

        return this.createPrecise(dataSource, identifier, diverse);
    }

    public createPrecise(
        dataSource: MiphaDataSource,
        identifier: string,
        diverse: MiphaBlockDiverseStructure<Type>,
    ): MiphaBlock<Type> {

        const initialHistory: string = this.generateHistoryHash(diverse);

        return {

            identifier,
            dataSourceIdentifier: dataSource.identifier,
            histories: [initialHistory],
            type: this.type,
            ...diverse,
        };
    }

    public update(block: MiphaBlock<Type>, diverse: MiphaBlockDiverseStructure<Type>): MiphaBlock<Type> {

        const history: string = this.generateHistoryHash(diverse);

        return {
            ...block,
            histories: [
                ...block.histories,
                history,
            ],
            ...diverse,
        };
    }

    public abstract generateHistoryHash(diverse: MiphaBlockDiverseStructure<Type>): string;
}
