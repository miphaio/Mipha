/**
 * @author WMXPY
 * @namespace Structure_Block_Diverse
 * @description Markdown
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "../diverse-type";
import { createMiphaBlock } from "../util/create";

export type MiphaBlockDiverseMarkdown = {

    readonly content: string;
};

const createBlock = (content: string): MiphaBlockDiverseMarkdown => {

    return {
        content,
    };
};

export const createPreciseMiphaMarkdownBlock = (
    identifier: string,
    content: string,
): MiphaBlockDiverseMarkdown => {

    return createMiphaBlock({
        identifier,
        type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
        diverse: createBlock(content),
    });
};

export const createMiphaMarkdownBlock = (
    content: string,
): MiphaBlockDiverseMarkdown => {

    return createMiphaBlock({
        type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN,
        diverse: createBlock(content),
    });
}
