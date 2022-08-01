/**
 * @author WMXPY
 * @namespace Structure_Diverse
 * @description Diverse
 */

import { ERROR_CODE, panic } from "../../util/error";
import { MiphaBlockDiverseHelper } from "./diverse-helper";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "./diverse-type";
import { MiphaMarkdownBlockDiverseHelper } from "./markdown/diverse-helper";

// Public
export class MiphaBlockDiverse {

    public static helperOf<Type extends MIPHA_BLOCK_DIVERSE_TYPE>(type: Type): MiphaBlockDiverseHelper<Type> {

        switch (type) {
            case MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN: {
                return MiphaMarkdownBlockDiverseHelper.getInstance() as MiphaBlockDiverseHelper<Type>;
            }
        }
        throw panic.code(ERROR_CODE.INVALID_BLOCK_DIVERSE_TYPE_1, type);
    }

    public static markdownHelper: MiphaBlockDiverseHelper<MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN> =
        this.helperOf(MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN);
}
