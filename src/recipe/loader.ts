/**
 * @author WMXPY
 * @namespace Recipe
 * @description Loader
 */

import { MiphaRecipe } from "./recipe";

// Public
export const MiphaRecipeLoadEmptySymbol = Symbol('MiphaRecipeLoadEmpty');

// Public
export type MiphaRecipeLoadMethod = (identifier: string) =>
    | (MiphaRecipe | typeof MiphaRecipeLoadEmptySymbol)
    | Promise<MiphaRecipe | typeof MiphaRecipeLoadEmptySymbol>;

// Public
export class MiphaRecipeLoader {

    public static fromLoadMethod(
        sourceName: string,
        recipeLoadMethod: MiphaRecipeLoadMethod,
    ): MiphaRecipeLoader {

        return new MiphaRecipeLoader(sourceName, recipeLoadMethod);
    }

    private readonly _sourceName: string;
    private readonly _method: MiphaRecipeLoadMethod;

    private constructor(
        sourceName: string,
        recipeLoadMethod: MiphaRecipeLoadMethod,
    ) {

        this._sourceName = sourceName;
        this._method = recipeLoadMethod;
    }

    public get sourceName(): string {
        return this._sourceName;
    }

    public async load(
        identifier: string,
    ): Promise<MiphaRecipe | typeof MiphaRecipeLoadEmptySymbol> {

        return await Promise.resolve(this._method(identifier));
    }
}
