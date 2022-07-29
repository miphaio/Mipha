/**
 * @author WMXPY
 * @namespace Renderer
 * @description Delayed Text Renderer
 * @override Mock
 */

import { MiphaRenderer, MiphaRendererBuilder, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../src";
import { mockSleep } from "../util/time";

const DELAY: number = 50;

export const mockDelayedTextRenderer: MiphaRenderer<string> =
    MiphaRendererBuilder.fromScratch<string>()
        .mountResolver(MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN, async (block) => {
            await mockSleep(DELAY);
            return block.content;
        })
        .build();
