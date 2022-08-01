/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Block Sync Action
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaBlockDiverse } from "../../../../src";
import { calculateBlockSyncAction, CalculateBlockSyncActionType } from "../../../../src/data/history-diff/block-sync-action";

describe('Given [CalculateBlockSyncAction] Methods', (): void => {

    const chance: Chance.Chance = new Chance('data-history-diff-block-sync-action');

    it('should be able to compare single block', async (): Promise<void> => {

        const first: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create({
            content: first,
        });

        const result = calculateBlockSyncAction([
            firstBlock,
        ]);

        expect(result).to.be.deep.equal([
            {
                block: firstBlock,
                type: CalculateBlockSyncActionType.PERSIST,
            },
        ]);
    });

    it('should be able to diff two same blocks', async (): Promise<void> => {

        const content: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create({
            content,
        });

        const result = calculateBlockSyncAction([
            firstBlock,
            firstBlock,
        ]);

        expect(result).to.be.deep.equal([
            {
                block: firstBlock,
                type: CalculateBlockSyncActionType.PERSIST,
            },
            {
                block: firstBlock,
                type: CalculateBlockSyncActionType.PERSIST,
            },
        ]);
    });

    it('should be able to diff two blocks with same start', async (): Promise<void> => {

        const first: string = chance.string();
        const second: string = chance.string();
        const third: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create({
            content: first,
        });
        const secondBlock = MiphaBlockDiverse.markdownHelper.update(firstBlock, {
            content: second,
        });
        const thirdBlock = MiphaBlockDiverse.markdownHelper.update(secondBlock, {
            content: third,
        });

        const result = calculateBlockSyncAction([
            firstBlock,
            secondBlock,
            thirdBlock,
        ]);

        expect(result).to.be.deep.equal([
            {
                block: firstBlock,
                type: CalculateBlockSyncActionType.FAST_FORWARD,
                latestBlock: thirdBlock,
            },
            {
                block: secondBlock,
                type: CalculateBlockSyncActionType.FAST_FORWARD,
                latestBlock: thirdBlock,
            },
            {
                block: thirdBlock,
                type: CalculateBlockSyncActionType.PERSIST,
            },
        ]);
    });

    it('should be able to diff two blocks with same start with conflict', async (): Promise<void> => {

        const first: string = chance.string();
        const second: string = chance.string();
        const third: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create({
            content: first,
        });
        const secondBlock = MiphaBlockDiverse.markdownHelper.update(firstBlock, {
            content: second,
        });
        const thirdBlock = MiphaBlockDiverse.markdownHelper.update(firstBlock, {
            content: third,
        });

        const result = calculateBlockSyncAction([
            firstBlock,
            secondBlock,
            thirdBlock,
        ]);

        expect(result).to.be.deep.equal([
            {
                block: firstBlock,
                type: CalculateBlockSyncActionType.FAST_FORWARD,
                latestBlock: secondBlock,
            },
            {
                block: secondBlock,
                type: CalculateBlockSyncActionType.PERSIST,
            },
            {
                block: thirdBlock,
                type: CalculateBlockSyncActionType.CONFLICT,
            },
        ]);
    });
});
