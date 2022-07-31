/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Common Start
 */

import { MiphaBlockBase } from "../../structure/block/block";

// Internal
export type FindHistoryBlockCommonStartResult<T extends MiphaBlockBase> = {

    readonly commonStart: string;
    readonly bestBlock: T;

    readonly appliedBlocks: T[];
    readonly unappliedBlocks: T[];
};

// Internal
export const findHistoryBlockCommonStart = <T extends MiphaBlockBase>(blocks: T[]): FindHistoryBlockCommonStartResult<T> => {

    const results: Array<FindHistoryBlockCommonStartResult<T>> = [];

    outer: for (let i = 0; i < blocks.length; i++) {

        const outerBlock: T = blocks[i];
        const blockStart: string | undefined = outerBlock.histories[0];

        if (typeof blockStart === 'undefined') {
            continue outer;
        }

        const appliedBlocks: T[] = [outerBlock];
        const unappliedBlocks: T[] = [];

        let bestLength: number = 0;
        let bestBlock: T = outerBlock;

        inner: for (let j = 0; j < blocks.length; j++) {

            if (i === j) {
                continue inner;
            }

            const innerBlock: T = blocks[j];
            const blockIndex: number = innerBlock.histories.indexOf(blockStart);

            if (blockIndex === -1) {
                unappliedBlocks.push(innerBlock);
                continue inner;
            }

            appliedBlocks.push(innerBlock);

            const length: number = innerBlock.histories.length - blockIndex;
            if (length > bestLength) {
                bestLength = length;
                bestBlock = innerBlock;
            }
        }

        results.push({
            commonStart: blockStart,
            bestBlock,
            appliedBlocks,
            unappliedBlocks,
        });
    }

    let bestResult: FindHistoryBlockCommonStartResult<T> = results[0];
    let bestResultLength: number = bestResult.appliedBlocks.length;

    for (let i = 1; i < results.length; i++) {

        const result: FindHistoryBlockCommonStartResult<T> = results[i];
        const length: number = result.appliedBlocks.length;

        if (length > bestResultLength) {
            bestResult = result;
            bestResultLength = length;
        }
    }

    return bestResult;
};
