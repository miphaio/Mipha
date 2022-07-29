/**
 * @author WMXPY
 * @namespace Renderer
 * @description Renderer
 */

import { MiphaBlock } from "../structure/block/block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../structure/block/diverse-type";
import { MiphaRendererResolver, MiphaRendererResolverMap } from "../structure/renderer/resolver";
import { ERROR_CODE, panic } from "../util/error";

export class MiphaRenderer<Result> {

    public static fromResolverMap<Result>(
        resolverMap: MiphaRendererResolverMap<Result>,
    ): MiphaRenderer<Result> {

        return new MiphaRenderer<Result>(resolverMap);
    }

    private readonly _resolvers: MiphaRendererResolverMap<Result>;

    private constructor(
        resolverMap: MiphaRendererResolverMap<Result>,
    ) {

        this._resolvers = resolverMap;
    }

    public render<Type extends MIPHA_BLOCK_DIVERSE_TYPE = any>(
        block: MiphaBlock<Type>,
    ) {

        const type: MIPHA_BLOCK_DIVERSE_TYPE = block.type;

        if (!this._resolvers.has(type)) {
            throw panic.code(ERROR_CODE.RESOLVER_NOT_MOUNTED_1, type);
        }

        const resolver: MiphaRendererResolver<Type, Result> =
            this._resolvers.get(type) as MiphaRendererResolver<Type, Result>;

        return resolver(block);
    }
}
