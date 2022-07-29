/**
 * @author WMXPY
 * @namespace Renderer
 * @description Renderer Manager
 */

import { MiphaRendererResolverMap } from "../structure/renderer/resolver";

export class MiphaRendererBuilder<Result> {

    public static create<Result>(): MiphaRendererBuilder<Result> {

        return new MiphaRendererBuilder<Result>();
    }

    private readonly _resolvers: MiphaRendererResolverMap<Result>;

    private constructor() {

        this._resolvers = new Map();
    }
}
