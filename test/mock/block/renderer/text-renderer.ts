/**
 * @author WMXPY
 * @namespace Block_Renderer
 * @description Text Renderer
 * @override Mock
 */

import { MiphaBlock, MiphaRenderer, MiphaRendererBuilder, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../../src/block/export";

export const createMockTextRenderer = (): MiphaRenderer<string> => {

    return MiphaRendererBuilder.fromScratch<string>()
        .mountResolver(
            MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
            (block: MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN>) => {
                return block.content;
            },
        )
        .build();
};
