/**
 * @author WMXPY
 * @namespace Renderer
 * @description Renderer
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { createMiphaMarkdownBlock } from "../../../src";
import { createMockDelayedTextRenderer } from "../../mock/renderer/delayed-text-renderer";
import { createMockTextRenderer } from "../../mock/renderer/text-renderer";

describe('Given {MiphaRenderer} Class', (): void => {

    const chance: Chance.Chance = new Chance('renderer-renderer');

    it('should be able to render single block', async (): Promise<void> => {

        const renderer = createMockTextRenderer();

        const content: string = chance.string();

        const result = await renderer.render(
            createMiphaMarkdownBlock(content),
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

            createMiphaMarkdownBlock(firstContent),
            createMiphaMarkdownBlock(secondContent),
            createMiphaMarkdownBlock(thirdContent),
        ]);

        const endTime: number = Date.now();

        expect(result).to.be.deep.equal(
            [firstContent, secondContent, thirdContent],
        );
        expect(endTime - startTime).to.be.greaterThan(25);
        expect(endTime - startTime).to.be.lessThan(40);
    });

    it('should be able to render multiple block serial', async (): Promise<void> => {

        const renderer = createMockDelayedTextRenderer(false);

        const firstContent: string = chance.string();
        const secondContent: string = chance.string();
        const thirdContent: string = chance.string();

        const startTime: number = Date.now();

        const result = await renderer.renderList([

            createMiphaMarkdownBlock(firstContent),
            createMiphaMarkdownBlock(secondContent),
            createMiphaMarkdownBlock(thirdContent),
        ]);

        const endTime: number = Date.now();

        expect(result).to.be.deep.equal(
            [firstContent, secondContent, thirdContent],
        );
        expect(endTime - startTime).to.be.greaterThan(75);
        expect(endTime - startTime).to.be.lessThan(90);
    });
});
