/**
 * @author WMXPY
 * @namespace Renderer
 * @description Renderer Manager
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "../structure/block/diverse-type";
import { ERROR_CODE, panic } from "../util/error";
import { MiphaRendererResolver, MiphaRendererResolverMap } from "./declare";
import { MiphaRenderer } from "./renderer";

export class MiphaRendererBuilder<Result> {

    public static fromScratch<Result>(): MiphaRendererBuilder<Result> {

        return new MiphaRendererBuilder<Result>();
    }

    private readonly _resolvers: MiphaRendererResolverMap<Result>;

    private constructor() {

        this._resolvers = new Map();
    }

    public mountResolver<Type extends MIPHA_BLOCK_DIVERSE_TYPE>(
        type: Type,
        resolver: MiphaRendererResolver<Type, Result>,
    ): this {

        if (this._resolvers.has(type)) {
            throw panic.code(ERROR_CODE.RESOLVER_ALREADY_MOUNTED_1, type);
        }

        this._resolvers.set(type, resolver);
        return this;
    }

    public build(): MiphaRenderer<Result> {

        return MiphaRenderer.fromResolverMap<Result>(this._resolvers);
    }
}
