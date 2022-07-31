/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Create
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { MiphaBlock, MiphaBlockDiverse } from "../block";
import { generateMiphaBlockHistory } from "../../diverse/diverse-history";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../../diverse/diverse-type";

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

    const initialHistory: string = generateMiphaBlockHistory(
        options.type,
        options.diverse,
    );

    return {
        identifier,
        histories: [initialHistory],
        type: options.type,
        ...options.diverse,
    };
};
