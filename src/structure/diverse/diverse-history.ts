/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Diverse History
 */

import { ERROR_CODE, panic } from "../../util/error";
import { MiphaBlockDiverse } from "./declare";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { generateMiphaMarkdownBlockHistory } from "./markdown/history";

export const generateMiphaBlockHistory = <Type extends MIPHA_BLOCK_DIVERSE_TYPE>(
    type: Type,
    block: MiphaBlockDiverse<Type>,
): string => {

    switch (type) {

        case MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN:
            return generateMiphaMarkdownBlockHistory(block);
    }

    throw panic.code(ERROR_CODE.INVALID_BLOCK_DIVERSE_TYPE_1, type);
};
