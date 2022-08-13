/**
 * @author WMXPY
 * @namespace Block_Data_HistoryDiff
 * @description Common Start
 */

import { MiphaBlockBase } from "../../structure/block/block";
import { calculateIsSameChain } from "./is-same-chain";

// Internal
export type FindHistoryBlockCommonStartResult<T extends MiphaBlockBase> = {

    readonly commonStart: string;
    readonly latestBlock: T;

    readonly appliedBlocks: T[];
};

type FindHistoryBlockCommonStartTempResult<T extends MiphaBlockBase> = {

    readonly unappliedBlocks: T[];
} & FindHistoryBlockCommonStartResult<T>;

// Internal
export const findHistoryBlockCommonStart = <T extends MiphaBlockBase>(blocks: T[]): Array<FindHistoryBlockCommonStartResult<T>> => {

    if (blocks.length === 0) {

        return [];
    }

    if (blocks.length === 1) {

        const block: T = blocks[0];
        return [{
            commonStart: block.histories[block.histories.length - 1],
            latestBlock: block,
            appliedBlocks: [block],
        }];
    }

    const results: Array<FindHistoryBlockCommonStartTempResult<T>> = [];

    outer: for (let i = 0; i < blocks.length; i++) {

        const outerBlock: T = blocks[i];
        const blockStart: string | undefined = outerBlock.histories[outerBlock.histories.length - 1];

        if (typeof blockStart === 'undefined') {
            continue outer;
        }

        const appliedBlocks: T[] = [];
        const unappliedBlocks: T[] = [];

        let bestLength: number = 0;
        let latestBlock: T = outerBlock;

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

            for (const appliedBlock of appliedBlocks) {
                const isSameChain: boolean = calculateIsSameChain(blockStart, innerBlock, appliedBlock);

                if (!isSameChain) {
                    unappliedBlocks.push(innerBlock);
                    continue inner;
                }
            }

            appliedBlocks.push(innerBlock);

            const length: number = innerBlock.histories.length - blockIndex;
            if (length > bestLength) {
                bestLength = length;
                latestBlock = innerBlock;
            }
        }

        results.push({
            commonStart: blockStart,
            latestBlock,
            appliedBlocks: [
                outerBlock,
                ...appliedBlocks,
            ],
            unappliedBlocks,
        });
    }

    let bestResult: FindHistoryBlockCommonStartTempResult<T> = results[0];
    let bestResultLength: number = bestResult.appliedBlocks.length;

    for (let i = 1; i < results.length; i++) {

        const result: FindHistoryBlockCommonStartTempResult<T> = results[i];
        const length: number = result.appliedBlocks.length;

        if (length > bestResultLength) {
            bestResult = result;
            bestResultLength = length;
        }
    }

    const finalResult: Array<FindHistoryBlockCommonStartResult<T>> = [
        {
            commonStart: bestResult.commonStart,
            latestBlock: bestResult.latestBlock,
            appliedBlocks: bestResult.appliedBlocks,
        },
    ];

    if (bestResult.unappliedBlocks.length > 0) {
        finalResult.push(...findHistoryBlockCommonStart(bestResult.unappliedBlocks));
    }

    return finalResult;
};
