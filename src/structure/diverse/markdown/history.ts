/**
 * @author WMXPY
 * @namespace Structure_Diverse_Markdown
 * @description History
 */

import { hashString } from "../../../util/hash";
import { MiphaBlockDiverseMarkdown } from "./declare";

// Internal
export const generateMiphaMarkdownBlockHistory = (diverse: MiphaBlockDiverseMarkdown): string => {

    return hashString(diverse.content);
};
