/**
 * @author WMXPY
 * @namespace Structure_Block_Diverse
 * @description Markdown
 */

import { MiphaBlock } from "../../block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../../diverse-type";
import { createMiphaBlock } from "../../util/create";
import { MiphaBlockDiverseMarkdown } from "./declare";

const createBlock = (content: string): MiphaBlockDiverseMarkdown => {

    return {
        content,
    };
};

// Public
export const createPreciseMiphaMarkdownBlock = (
    identifier: string,
    content: string,
): MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN> => {

    return createMiphaBlock({
        identifier,
        type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
        diverse: createBlock(content),
    });
};

// Public
export const createMiphaMarkdownBlock = (
    content: string,
): MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN> => {

    return createMiphaBlock({
        type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
        diverse: createBlock(content),
    });
};
