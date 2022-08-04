/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Common Start
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaBlockDiverse, MiphaDataSource } from "../../../../src";
import { findHistoryBlockCommonStart } from "../../../../src/data/history-diff/common-start";

describe('Given [CommonStart] Methods', (): void => {

    const chance: Chance.Chance = new Chance('data-common-start');

    const dataSource: MiphaDataSource = MiphaDataSource.fromScratch();

    it('should be able to find common start for single block', async (): Promise<void> => {

        const first: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
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
        }]);
    });

    it('should be able to find common start for double same block', async (): Promise<void> => {

        const content: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content,
        });
        const secondBlock = MiphaBlockDiverse.markdownHelper.createPrecise(
            dataSource,
            firstBlock.identifier, {
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
        }]);
    });

    it('should be able to find common start for single block chain', async (): Promise<void> => {

        const content: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
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
        }]);
    });

    it('should be able to find common start for double block chain', async (): Promise<void> => {

        const firstChainFirstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: chance.string(),
        });
        const firstChainSecondBlock = MiphaBlockDiverse.markdownHelper.update(
            firstChainFirstBlock,
            {
                content: chance.string(),
            },
        );

        const secondChainFirstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: chance.string(),
        });

        const firstHistory = firstChainFirstBlock.histories[0];
        const secondHistory = secondChainFirstBlock.histories[0];

        const result = findHistoryBlockCommonStart([
            firstChainFirstBlock,
            firstChainSecondBlock,
            secondChainFirstBlock,
        ]);

        expect(result).to.be.deep.equal([
            {
                commonStart: firstHistory,
                latestBlock: firstChainSecondBlock,
                appliedBlocks: [firstChainFirstBlock, firstChainSecondBlock],
            },
            {
                commonStart: secondHistory,
                latestBlock: secondChainFirstBlock,
                appliedBlocks: [secondChainFirstBlock],
            },
        ]);
    });

    it('should be able to find common start for double block chain with variant', async (): Promise<void> => {

        const first: string = chance.string();
        const second: string = chance.string();
        const third: string = chance.string();

        const firstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: first,
        });
        const secondBlock = MiphaBlockDiverse.markdownHelper.update(firstBlock, {
            content: second,
        });
        const thirdBlock = MiphaBlockDiverse.markdownHelper.update(firstBlock, {
            content: third,
        });

        const firstHistory = firstBlock.histories[0];
        const thirdHistory = thirdBlock.histories[1];

        const result = findHistoryBlockCommonStart([
            firstBlock,
            secondBlock,
            thirdBlock,
        ]);

        expect(result).to.be.deep.equal([{
            commonStart: firstHistory,
            latestBlock: secondBlock,
            appliedBlocks: [firstBlock, secondBlock],
        }, {
            commonStart: thirdHistory,
            latestBlock: thirdBlock,
            appliedBlocks: [thirdBlock],
        }]);
    });

    it('should be able to find common start for triple block chain', async (): Promise<void> => {

        const firstChainFirstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: chance.string(),
        });
        const firstChainSecondBlock = MiphaBlockDiverse.markdownHelper.update(
            firstChainFirstBlock,
            {
                content: chance.string(),
            },
        );

        const secondChainFirstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: chance.string(),
        });

        const thirdChainFirstBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: chance.string(),
        });
        const thirdChainSecondBlock = MiphaBlockDiverse.markdownHelper.update(
            thirdChainFirstBlock,
            {
                content: chance.string(),
            },
        );

        const firstHistory = firstChainFirstBlock.histories[0];
        const secondHistory = secondChainFirstBlock.histories[0];
        const thirdHistory = thirdChainFirstBlock.histories[0];

        const result = findHistoryBlockCommonStart([
            firstChainFirstBlock,
            firstChainSecondBlock,
            secondChainFirstBlock,
            thirdChainFirstBlock,
            thirdChainSecondBlock,
        ]);

        expect(result).to.be.deep.equal([
            {
                commonStart: firstHistory,
                latestBlock: firstChainSecondBlock,
                appliedBlocks: [firstChainFirstBlock, firstChainSecondBlock],
            },
            {
                commonStart: thirdHistory,
                latestBlock: thirdChainSecondBlock,
                appliedBlocks: [thirdChainFirstBlock, thirdChainSecondBlock],
            },
            {
                commonStart: secondHistory,
                latestBlock: secondChainFirstBlock,
                appliedBlocks: [secondChainFirstBlock],
            },
        ]);
    });
});
