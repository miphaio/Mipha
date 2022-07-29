/**
 * @author WMXPY
 * @namespace Renderer
 * @description Delayed Text Renderer
 * @override Mock
 */

import { MiphaRenderer, MiphaRendererBuilder, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../src";
import { mockSleep } from "../util/time";

export const mockDelayedTextRenderer: MiphaRenderer<string> =
    MiphaRendererBuilder.fromScratch<string>()
        .mountResolver(MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN, async (block) => {
            await mockSleep(50);
            return block.content;
        })
        .build();
