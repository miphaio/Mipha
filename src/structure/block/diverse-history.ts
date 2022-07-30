/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Diverse History
 */

import { ERROR_CODE, panic } from "../../util/error";
import { MiphaBlock } from "./block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { generateMiphaMarkdownBlockHistory } from "./diverse/markdown/history";

export const generateMiphaBlockHistory = (
    block: MiphaBlock<MIPHA_BLOCK_DIVERSE_TYPE>,
): string => {

    switch (block.type) {

        case MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN:
            return generateMiphaMarkdownBlockHistory(block);
    }

    throw panic.code(ERROR_CODE.INVALID_BLOCK_DIVERSE_TYPE_1, block.type);
};
