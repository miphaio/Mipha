/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Common Start
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaBlockDiverse, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../../src";
import { findHistoryBlockCommonStart } from "../../../../src/data/history-diff/common-start";

describe('Given [CommonStart] Methods', (): void => {

    const chance: Chance.Chance = new Chance('data-common-start');

    it('should be able to find common start for single block', async (): Promise<void> => {

        const first: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create({
            content: first,
        });

        const firstHistory = firstBlock.histories[0];

        const result = findHistoryBlockCommonStart([
            firstBlock,
        ]);

        expect(result).to.be.deep.equal([{
            commonStart: firstHistory,
            latestBlock: firstBlock,
            appliedBlocks: [firstBlock],
            unappliedBlocks: [],
        }]);
    });

    it('should be able to find common start for double same block', async (): Promise<void> => {

        const content: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create({
            content,
        });
        const secondBlock = MiphaBlockDiverse.markdownHelper.createPrecise(firstBlock.identifier, {
            content,
        });

        const firstHistory = firstBlock.histories[0];

        const result = findHistoryBlockCommonStart([
            firstBlock,
            secondBlock,
        ]);

        expect(result).to.be.deep.equal([{
            commonStart: firstHistory,
            latestBlock: firstBlock,
            appliedBlocks: [firstBlock, secondBlock],
            unappliedBlocks: [],
        }]);
    });

    it('should be able to find common start for single block chain', async (): Promise<void> => {

        const content: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create({
            content,
        });
        const secondBlock = MiphaBlockDiverse.markdownHelper.update(firstBlock, {
            content: chance.string(),
        });

        const firstHistory = firstBlock.histories[0];

        const result = findHistoryBlockCommonStart([
            firstBlock,
            secondBlock,
        ]);

        expect(result).to.be.deep.equal([{
            commonStart: firstHistory,
            latestBlock: secondBlock,
            appliedBlocks: [firstBlock, secondBlock],
            unappliedBlocks: [],
        }]);
    });
});
