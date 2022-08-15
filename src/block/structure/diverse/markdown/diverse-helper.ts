/**
 * @author WMXPY
 * @namespace Block_Structure_Diverse_Markdown
 * @description Diverse Helper
 */

import { hashString } from "../../../../util/hash";
import { MiphaBlockDiverseHelper } from "../diverse-helper";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../diverse-type";
import { MiphaBlockDiverseMarkdown } from "./declare";

// Internal
export class MiphaMarkdownBlockDiverseHelper extends MiphaBlockDiverseHelper<MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN> {

    public static getInstance(): MiphaBlockDiverseHelper<MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN> {

        return new MiphaMarkdownBlockDiverseHelper();
    }

    public readonly type: MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN =
        MIPHA_BLOCK_DIVERSE_TYPE.MARKDOWN;

    public generateHistoryHash(diverse: MiphaBlockDiverseMarkdown): string {

        return hashString(diverse.content);
    }
}
