/**
 * @author WMXPY
 * @namespace Block_Data_HistoryDiff
 * @description Block Sync Action
 */

import { MiphaBlockBase } from "../../structure/block/block";
import { ERROR_CODE, panic } from "../../util/error";
import { findHistoryBlockCommonStart, FindHistoryBlockCommonStartResult } from "./common-start";

// Internal
export enum CalculateBlockSyncActionType {

    PERSIST = 'PERSIST',
    FAST_FORWARD = 'FAST_FORWARD',
}

// Internal
export type CalculateBlockSyncActionVariantBlock<T extends MiphaBlockBase> =
    & {
        readonly block: T;
    }
    & (
        | {
            readonly type: CalculateBlockSyncActionType.PERSIST;
        }
        | {
            readonly type: CalculateBlockSyncActionType.FAST_FORWARD;
            readonly latestBlock: T;
        }
    );

// Internal
export type CalculateBlockSyncActionResultVariant<T extends MiphaBlockBase> = {

    readonly variantBlocks: Array<CalculateBlockSyncActionVariantBlock<T>>;
    readonly isBestVariant: boolean;
};

// Internal
export const calculateBlockSyncAction = <T extends MiphaBlockBase>(blocks: T[]): Array<CalculateBlockSyncActionResultVariant<T>> => {

    if (blocks.length === 1) {

        return [{
            variantBlocks: [{
                block: blocks[0],
                type: CalculateBlockSyncActionType.PERSIST,
            }],
            isBestVariant: true,
        }];
    }

    const commonStarts: Array<FindHistoryBlockCommonStartResult<T>> =
        findHistoryBlockCommonStart(blocks);

    if (commonStarts.length === 0) {
        throw panic.code(ERROR_CODE.FAILED_CALCULATE_COMMON_START);
    }

    return commonStarts.map((commonStart: FindHistoryBlockCommonStartResult<T>, index: number) => {

        const variantBlocks: Array<CalculateBlockSyncActionVariantBlock<T>> = commonStart.appliedBlocks.map((block: T) => {

            const bestLatestHistory: string = commonStart.latestBlock.histories[commonStart.latestBlock.histories.length - 1];
            const blockLatestHistory: string = block.histories[block.histories.length - 1];

            if (blockLatestHistory === bestLatestHistory) {
                return {
                    block,
                    type: CalculateBlockSyncActionType.PERSIST,
                };
            }

            return {
                block,
                type: CalculateBlockSyncActionType.FAST_FORWARD,
                latestBlock: commonStart.latestBlock,
            };
        });

        return {
            variantBlocks,
            isBestVariant: index === 0,
        };
    });
};
