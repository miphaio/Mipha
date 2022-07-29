/**
 * @author WMXPY
 * @namespace Renderer
 * @description Text Renderer
 * @override Mock
 */

import { MiphaRenderer, MiphaRendererBuilder, MIPHA_BLOCK_DIVERSE_TYPE } from "../../../src";

export const mockTextRenderer: MiphaRenderer<string> =
    MiphaRendererBuilder.fromScratch<string>()
        .mountResolver(MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN, (block) => {
            return block.content;
        })
        .build();
