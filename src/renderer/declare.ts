/**
 * @author WMXPY
 * @namespace Renderer
 * @description Declare
 */

import { MiphaBlock } from "../structure/block/block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../structure/diverse/diverse-type";

export type MiphaRendererResolver<Type extends MIPHA_BLOCK_DIVERSE_TYPE, Result> = (
    block: MiphaBlock<Type>,
) => Result | Promise<Result>;

export type MiphaRendererResolverMap<Result> = Map<
    MIPHA_BLOCK_DIVERSE_TYPE,
    MiphaRendererResolver<any, Result>
>;

export type MiphaRendererOptions = {

    readonly parallel: boolean;
};

export const DefaultMiphaRendererOptions: MiphaRendererOptions = {

    parallel: true,
};
