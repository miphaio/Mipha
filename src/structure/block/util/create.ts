/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Create
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { MiphaBlock, MiphaBlockDiverse } from "../block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../diverse-type";

export type CreateMiphaBlockOptions<Type extends MIPHA_BLOCK_DIVERSE_TYPE> = {

    readonly identifier?: string;

    readonly type: Type;
    readonly diverse: MiphaBlockDiverse<Type>;
};

export const createMiphaBlock = <Type extends MIPHA_BLOCK_DIVERSE_TYPE>(
    options: CreateMiphaBlockOptions<Type>,
): MiphaBlock<Type> => {

    const identifier: string = typeof options.identifier === 'string'
        ? options.identifier
        : UUIDVersion1.generate().toString();

    return {
        identifier,
        type: options.type,
        ...options.diverse,
    };
};
