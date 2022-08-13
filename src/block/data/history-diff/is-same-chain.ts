/**
 * @author WMXPY
 * @namespace Block_Data_HistoryDiff
 * @description Is Same Chain
 */

import { MiphaBlockBase } from "../../structure/block/block";

// Internal
export const calculateIsSameChain = <T extends MiphaBlockBase>(
    startHistory: string,
    pendingBlock: T,
    targetBlock: T,
): boolean => {

    const pendingBlockStartIndex: number = pendingBlock.histories.indexOf(startHistory);
    const targetBlockStartIndex: number = targetBlock.histories.indexOf(startHistory);

    if (pendingBlockStartIndex === -1 || targetBlockStartIndex === -1) {
        return false;
    }

    for (
        let i = pendingBlockStartIndex, j = targetBlockStartIndex;
        i < pendingBlock.histories.length && j < targetBlock.histories.length;
        i++, j++
    ) {
        if (pendingBlock.histories[i] !== targetBlock.histories[j]) {
            return false;
        }
    }

    return true;
};
