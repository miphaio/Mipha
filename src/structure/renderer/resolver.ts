/**
 * @author WMXPY
 * @namespace Structure_Resolver
 * @description Resolver
 */

import { MiphaBlock } from "../block/block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../block/diverse-type";

export type MiphaRendererResolver<Type extends MIPHA_BLOCK_DIVERSE_TYPE, Result> = (
    block: MiphaBlock<Type>,
) => Result | Promise<Result>;

export type MiphaRendererResolverMap<Result> = Map<
    MIPHA_BLOCK_DIVERSE_TYPE,
    MiphaRendererResolver<any, Result>
>;
