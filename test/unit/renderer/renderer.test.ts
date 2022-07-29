/**
 * @author WMXPY
 * @namespace Renderer
 * @description Renderer
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../../../src";
import { mockDelayedTextRenderer } from "../../mock/renderer/delayed-text-renderer";

describe('Given {MiphaRenderer} Class', (): void => {

    const chance: Chance.Chance = new Chance('renderer-renderer');

    const renderer = mockDelayedTextRenderer;

    it('should be able to render single block', async (): Promise<void> => {

        const content: string = chance.string();

        const result = await renderer.render({
            identifier: chance.string(),
            type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
            content,
        });

        expect(result).to.be.equal(content);
    });
});
