/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Block Sync Action
 */

import { MiphaBlockBase } from "../../structure/block/block";
import { ERROR_CODE, panic } from "../../util/error";
import { findHistoryBlockCommonStart, FindHistoryBlockCommonStartResult } from "./common-start";

export enum CalculateBlockSyncActionType {

    PERSIST = 'PERSIST',
    FAST_FORWARD = 'FAST_FORWARD',
    CONFLICT = 'CONFLICT',
}

// Internal
export type CalculateBlockSyncActionResult<T extends MiphaBlockBase> =
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
        | {
            readonly type: CalculateBlockSyncActionType.CONFLICT;
        }
    );

// Internal
export const calculateBlockSyncAction = <T extends MiphaBlockBase>(blocks: T[]): Array<CalculateBlockSyncActionResult<T>> => {

    if (blocks.length === 1) {
        return [{
            block: blocks[0],
            type: CalculateBlockSyncActionType.PERSIST,
        }];
    }

    const commonStarts: Array<FindHistoryBlockCommonStartResult<T>> = findHistoryBlockCommonStart(blocks);

    if (commonStarts.length === 0) {
        throw panic.code(ERROR_CODE.FAILED_CALCULATE_COMMON_START);
    }

    const firstCommonStart: FindHistoryBlockCommonStartResult<T> = commonStarts[0];
    const results: Array<CalculateBlockSyncActionResult<T>> =
        firstCommonStart.appliedBlocks.map((block: T) => {
            if (block.histories[block.histories.length - 1] === firstCommonStart.commonStart) {
                return {
                    block,
                    type: CalculateBlockSyncActionType.PERSIST,
                };
            }

            return {
                block,
                type: CalculateBlockSyncActionType.FAST_FORWARD,
                latestBlock: firstCommonStart.latestBlock,
            };
        });

    for (let i = 1; i < commonStarts.length; i++) {
        const commonStart: FindHistoryBlockCommonStartResult<T> = commonStarts[i];
        results.push({
            block: commonStart.latestBlock,
            type: CalculateBlockSyncActionType.CONFLICT,
        });
    }

    return results;
};
