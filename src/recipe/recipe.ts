/**
 * @author WMXPY
 * @namespace Recipe
 * @description Recipe
 */

import { MiphaRecipeConfig } from "./declare";
import { MiphaRecipeMetadata } from "./metadata";

// Public
export class MiphaRecipe {

    public static fromConfig(config: MiphaRecipeConfig): MiphaRecipe {

        return this.fromCode(
            MiphaRecipeMetadata.fromConfig(config.metadata),
            config.recipeCode,
        );
    }

    public static fromCode(metadata: MiphaRecipeMetadata, recipeCode: string,): MiphaRecipe {

        return new MiphaRecipe(metadata, recipeCode);
    }

    private readonly _metadata: MiphaRecipeMetadata;
    private readonly _recipeCode: string;

    private constructor(metadata: MiphaRecipeMetadata, recipeCode: string) {

        this._metadata = metadata;
        this._recipeCode = recipeCode;
    }

    public get identifier(): string {
        return this._metadata.identifier;
    }

    public get metadata(): MiphaRecipeMetadata {
        return this._metadata;
    }
    public get recipeCode(): string {
        return this._recipeCode;
    }

    public toConfig(): MiphaRecipeConfig {

        return {
            metadata: this._metadata.toConfig(),
            recipeCode: this._recipeCode,
        };
    }
}
