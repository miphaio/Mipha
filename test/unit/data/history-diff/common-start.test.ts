/**
 * @author WMXPY
 * @namespace Data_HistoryDiff
 * @description Common Start
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { createMiphaMarkdownBlock } from "../../../../src";
import { findHistoryBlockCommonStart } from "../../../../src/data/history-diff/common-start";

describe('Given [CommonStart] Methods', (): void => {

    const chance: Chance.Chance = new Chance('data-common-start');

    it('should be able to find common start for single block', async (): Promise<void> => {

        const first: string = chance.string();
        const firstBlock = createMiphaMarkdownBlock(first);

        const firstHistory = firstBlock.histories[0];

        const result = findHistoryBlockCommonStart([
            firstBlock,
        ]);

        expect(result).to.be.deep.equal({
            commonStart: firstHistory,
            bestBlock: firstBlock,
            appliedBlocks: [firstBlock],
            unappliedBlocks: [],
        });
    });
});
