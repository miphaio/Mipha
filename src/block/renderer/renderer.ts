/**
 * @author WMXPY
 * @namespace Block_Renderer
 * @description Renderer
 */

import { MiphaBlock } from "../structure/block/block";
import { MIPHA_BLOCK_DIVERSE_TYPE } from "../structure/diverse/diverse-type";
import { ERROR_CODE, panic } from "../../util/error";
import { MiphaRendererOptions, MiphaRendererResolver, MiphaRendererResolverMap } from "./declare";

export class MiphaRenderer<Result> {

    public static fromResolverMap<Result>(
        resolverMap: MiphaRendererResolverMap<Result>,
        options: MiphaRendererOptions,
    ): MiphaRenderer<Result> {

        return new MiphaRenderer<Result>(
            resolverMap,
            options,
        );
    }

    private readonly _resolvers: MiphaRendererResolverMap<Result>;
    private readonly _options: MiphaRendererOptions;

    private constructor(
        resolverMap: MiphaRendererResolverMap<Result>,
        options: MiphaRendererOptions,
    ) {

        this._resolvers = resolverMap;
        this._options = options;
    }

    public async render<Type extends MIPHA_BLOCK_DIVERSE_TYPE = MIPHA_BLOCK_DIVERSE_TYPE>(
        block: MiphaBlock<Type>,
    ): Promise<Result> {

        const type: MIPHA_BLOCK_DIVERSE_TYPE = block.type;

        if (!this._resolvers.has(type)) {
            throw panic.code(ERROR_CODE.RESOLVER_NOT_MOUNTED_1, type);
        }

        const resolver: MiphaRendererResolver<Type, Result> =
            this._resolvers.get(type) as MiphaRendererResolver<Type, Result>;

        return await Promise.resolve(resolver(block));
    }

    public async renderList(
        blocks: Array<MiphaBlock<any>>,
    ): Promise<Result[]> {

        if (this._options.parallel) {
            return this._renderListParallel(blocks);
        }
        return this._renderListSerial(blocks);
    }

    private async _renderListParallel(
        blocks: Array<MiphaBlock<any>>,
    ): Promise<Result[]> {

        const results: Array<Promise<Result>> = blocks.map(
            async (block: MiphaBlock<any>): Promise<Result> => {
                return await this.render(block);
            }
        );
        return Promise.all(results);
    }

    private async _renderListSerial(
        blocks: Array<MiphaBlock<any>>,
    ): Promise<Result[]> {

        const results: Result[] = [];
        for (const block of blocks) {
            results.push(await this.render(block));
        }
        return results;
    }
}
