/**
 * @author WMXPY
 * @namespace Structure_Block_Diverse
 * @description Markdown
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "../diverse-type";

export type MiphaBlockDiverseMarkdown = {

    readonly type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN;

    readonly content: string;
};
