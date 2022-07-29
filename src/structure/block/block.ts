/**
 * @author WMXPY
 * @namespace Structure_Block
 * @description Block
 */

import { MiphaBlockDiverseMarkdown } from "./diverse/markdown";

export type MiphaBlock =
    & MiphaBlockDiverse
    & MiphaBlockBase;

export type MiphaBlockDiverse =
    | MiphaBlockDiverseMarkdown;

export type MiphaBlockBase = {

    readonly identifier: string;
};
