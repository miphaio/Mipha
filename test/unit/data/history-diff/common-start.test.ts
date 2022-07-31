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

    it('should be able to find common start', async (): Promise<void> => {

        const first: string = chance.string();
        const firstBlock = createMiphaMarkdownBlock(first);

        const result = findHistoryBlockCommonStart([
            firstBlock,
        ]);

        console.log(result);

        expect(result).to.be.exist;
    });
});
