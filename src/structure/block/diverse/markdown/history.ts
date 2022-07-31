/**
 * @author WMXPY
 * @namespace Structure_Block_Diverse
 * @description History
 */

import { hashString } from "../../../../util/hash";
import { MiphaBlockDiverseMarkdown } from "./declare";

export const generateMiphaMarkdownBlockHistory = (diverse: MiphaBlockDiverseMarkdown): string => {

    return hashString(diverse.content);
};