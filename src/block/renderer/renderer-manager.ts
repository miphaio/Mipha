/**
 * @author WMXPY
 * @namespace Block_Renderer
 * @description Renderer Manager
 */

import { MIPHA_BLOCK_DIVERSE_TYPE } from "../structure/diverse/diverse-type";
import { ERROR_CODE, panic } from "../../util/error";
import { Writeable } from "../../util/writeable";
import { DefaultMiphaRendererOptions, MiphaRendererOptions, MiphaRendererResolver, MiphaRendererResolverMap } from "./declare";
import { MiphaRenderer } from "./renderer";

export class MiphaRendererBuilder<Result> {

    public static fromScratch<Result>(
        options: MiphaRendererOptions = DefaultMiphaRendererOptions,
    ): MiphaRendererBuilder<Result> {

        return new MiphaRendererBuilder<Result>(options);
    }

    private readonly _resolvers: MiphaRendererResolverMap<Result>;
    private readonly _options: Writeable<MiphaRendererOptions>;

    private constructor(
        options: MiphaRendererOptions,
    ) {

        this._resolvers = new Map();
        this._options = options;
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

    public withOption<Key extends keyof MiphaRendererOptions>(
        key: Key,
        value: MiphaRendererOptions[Key],
    ): this {

        this._options[key] = value;
        return this;
    }

    public build(): MiphaRenderer<Result> {

        return MiphaRenderer.fromResolverMap<Result>(
            this._resolvers,
            this._options,
        );
    }
}
