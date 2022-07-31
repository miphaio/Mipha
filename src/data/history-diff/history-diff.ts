/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description History Diff
 */

import { MiphaBlockBase } from "../../structure/block/block";

// Internal
export const calculateHistoryDiff = <T extends MiphaBlockBase>(blocks: T[]): T[] => {

    if (blocks.length === 1) {
        return blocks;
    }


    return blocks;
};
