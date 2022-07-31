/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Common Start
 */

import { MiphaBlockBase } from "../../structure/block/block";

// Internal
export type FindHistoryBlockCommonStartResult<T extends MiphaBlockBase> = {

    readonly commonStart: string;
    readonly appliedBlocks: T[];
    readonly unappliedBlocks: T[];
};

// Internal
export const findHistoryBlockCommonStart = <T extends MiphaBlockBase>(blocks: T[]): FindHistoryBlockCommonStartResult<T> => {

    outer: for (let i = 0; i < blocks.length; i++) {

        const blockStart: string | undefined = blocks[i].histories[0];

        if (typeof blockStart === 'undefined') {
            continue outer;
        }

        inner: for (let j = 0; j < blocks.length; j++) {

            if (i === j) {
                continue inner;
            }

        }
    }

    return null as any;
};
