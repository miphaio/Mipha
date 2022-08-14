/**
 * @author WMXPY
 * @namespace Block_Renderer
 * @description Delayed Text Renderer
 * @override Mock
 */

import { MiphaBlock, MiphaRenderer, MiphaRendererBuilder, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../../src/block/export";
import { mockSleep } from "../util/time";

const DELAY: number = 25;

export const createMockDelayedTextRenderer = (
    parallel: boolean,
): MiphaRenderer<string> => {

    return MiphaRendererBuilder.fromScratch<string>()
        .mountResolver(
            MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
            async (block: MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN>) => {
                await mockSleep(DELAY);
                return block.content;
            },
        )
        .withOption('parallel', parallel)
        .build();
};
