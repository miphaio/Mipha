/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Is Same Chain
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaBlockDiverse, MiphaDataSource } from "../../../../src";
import { calculateIsSameChain } from "../../../../src/data/history-diff/is-same-chain";

describe('Given [CalculateIsSameChain] Methods', (): void => {

    const chance: Chance.Chance = new Chance('data-history-diff-is-same-chain');

    const dataSource: MiphaDataSource = MiphaDataSource.fromScratch();

    it('should be able to confirm if its the same chain', async (): Promise<void> => {

        const initial: string = chance.string();
        const first: string = chance.string();

        const initialBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: initial,
        });
        const firstBlock = MiphaBlockDiverse.markdownHelper.update(initialBlock, {
            content: first,
        });

        const result = calculateIsSameChain(initialBlock.histories[0], firstBlock, initialBlock);

        expect(result).to.be.true;
    });

    it('should be able to reject if its not the same chain', async (): Promise<void> => {

        const initial: string = chance.string();
        const first: string = chance.string();
        const second: string = chance.string();

        const initialBlock = MiphaBlockDiverse.markdownHelper.create(dataSource, {
            content: initial,
        });
        const firstBlock = MiphaBlockDiverse.markdownHelper.update(initialBlock, {
            content: first,
        });
        const secondBlock = MiphaBlockDiverse.markdownHelper.update(initialBlock, {
            content: second,
        });

        const result = calculateIsSameChain(initialBlock.histories[0], firstBlock, secondBlock);

        expect(result).to.be.false;
    });
});
