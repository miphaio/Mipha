/**
 * @author WMXPY
 * @namespace Block_Renderer
 * @description Renderer
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MiphaBlockDiverse, MiphaDataSource } from "../../../../src/block/export";
import { createMockDelayedTextRenderer } from "../../../mock/block/renderer/delayed-text-renderer";
import { createMockTextRenderer } from "../../../mock/block/renderer/text-renderer";

describe('Given {MiphaRenderer} Class', (): void => {

    const chance: Chance.Chance = new Chance('renderer-renderer');

    const dataSource: MiphaDataSource = MiphaDataSource.fromScratch();

    it('should be able to render single block', async (): Promise<void> => {

        const renderer = createMockTextRenderer();

        const content: string = chance.string();

        const result = await renderer.render(
            MiphaBlockDiverse.markdownHelper.create(dataSource, {
                content,
            }),
        );

        expect(result).to.be.equal(content);
    });

    it('should be able to render multiple block parallel', async (): Promise<void> => {

        const renderer = createMockDelayedTextRenderer(true);

        const firstContent: string = chance.string();
        const secondContent: string = chance.string();
        const thirdContent: string = chance.string();

        const startTime: number = Date.now();

        const result = await renderer.renderList([

            MiphaBlockDiverse.markdownHelper.create(dataSource, {
                content: firstContent,
            }),
            MiphaBlockDiverse.markdownHelper.create(dataSource, {
                content: secondContent,
            }),
            MiphaBlockDiverse.markdownHelper.create(dataSource, {
                content: thirdContent,
            }),
        ]);

        const endTime: number = Date.now();

        expect(result).to.be.deep.equal(
            [firstContent, secondContent, thirdContent],
        );
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(endTime - startTime).to.be.greaterThanOrEqual(25);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(endTime - startTime).to.be.lessThan(40);
    });

    it('should be able to render multiple block serial', async (): Promise<void> => {

        const renderer = createMockDelayedTextRenderer(false);

        const firstContent: string = chance.string();
        const secondContent: string = chance.string();
        const thirdContent: string = chance.string();

        const startTime: number = Date.now();

        const result = await renderer.renderList([

            MiphaBlockDiverse.markdownHelper.create(dataSource, {
                content: firstContent,
            }),
            MiphaBlockDiverse.markdownHelper.create(dataSource, {
                content: secondContent,
            }),
            MiphaBlockDiverse.markdownHelper.create(dataSource, {
                content: thirdContent,
            }),
        ]);

        const endTime: number = Date.now();

        expect(result).to.be.deep.equal(
            [firstContent, secondContent, thirdContent],
        );
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(endTime - startTime).to.be.greaterThanOrEqual(75);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        expect(endTime - startTime).to.be.lessThan(90);
    });
});