/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description History Diff
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { createMiphaMarkdownBlock } from "../../../../src";
import { calculateHistoryDiff } from "../../../../src/data/history-diff/history-diff";

describe('Given [HistoryDiff] Methods', (): void => {

    const chance: Chance.Chance = new Chance('data-history-diff');

    it('should be able to compare single block', async (): Promise<void> => {

        const first: string = chance.string();
        const firstBlock = createMiphaMarkdownBlock(first);

        const result = calculateHistoryDiff([
            firstBlock,
        ]);

        expect(result).to.be.deep.equal([
            firstBlock,
        ]);
    });

    it('should be able to diff two blocks with same start', async (): Promise<void> => {

    });
});
